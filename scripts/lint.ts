import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getTableOfContents } from "fumadocs-core/content/toc";
import { createGetUrl, getSlugs } from "fumadocs-core/source";
import {
  type FileObject,
  printErrors,
  readFiles,
  type ScanResult,
  scanURLs,
  type UrlMeta,
  validateFiles,
} from "next-validate-link";
import { i18n } from "../src/lib/i18n.ts";
import {
  CODE_QUALITY_REPORT_PATH,
  toCodeQualityReport,
} from "./code-quality-report.ts";

const docsUrl = createGetUrl("/", i18n);

type RoutedFile = {
  file: FileObject;
  locale: string;
  slugs: string[];
  hashes: string[];
};

async function checkLinks() {
  const docsFiles = await loadCollection("content/docs", docsUrl);
  const homeFiles = docsFiles.filter((item) => item.slugs.length === 0);
  const articleFiles = docsFiles.filter((item) => item.slugs.length > 0);

  const scanned = await scanURLs({
    preset: "next",
    populate: {
      "[lang]/(home)": homeFiles.map((item) => ({
        value: { lang: item.locale },
        hashes: item.hashes,
      })),
      "[lang]/(docs)/[...slug]": articleFiles.map((item) => ({
        value: {
          lang: item.locale,
          slug: item.slugs,
        },
        hashes: item.hashes,
      })),
      "[lang]/(home)/sok": i18n.languages.map((lang) => ({
        value: { lang },
      })),
    },
  });

  addDefaultLocaleAliases(scanned);
  addContentUrls(scanned, docsFiles);
  await addPublicAssets(scanned);
  addTrailingSlashAliases(scanned);

  console.log(
    `collected ${scanned.urls.size} URLs, ${scanned.fallbackUrls.length} fallbacks`,
  );

  const results = await validateFiles(
    docsFiles.map((item) => item.file),
    {
      scanned,
      markdown: {
        components: {
          a: { attributes: ["href"] },
        },
      },
      checkRelativePaths: "as-url",
    },
  );

  await writeFile(
    CODE_QUALITY_REPORT_PATH,
    `${JSON.stringify(toCodeQualityReport(results), null, 2)}\n`,
  );

  printErrors(results, true);
}

async function loadCollection(
  dir: string,
  toUrl: (slugs: string[], locale?: string) => string,
): Promise<RoutedFile[]> {
  const files = await readFiles(`${dir}/**/*.{md,mdx}`);

  return files.map((file) => {
    const { locale, slugs } = parseLocalizedFile(file.path, dir);
    const hashes = headingHashes(file.content);

    return {
      file: {
        ...file,
        url: toUrl(slugs, locale),
      },
      locale,
      slugs,
      hashes,
    };
  });
}

function headingHashes(content: string): string[] {
  const hashes = getTableOfContents(content).map((item) => item.url.slice(1));
  const encoded = hashes.flatMap((hash) => {
    const uri = encodeURI(hash);
    return uri === hash ? [] : [uri];
  });
  return [...hashes, ...encoded];
}

/** Content lives in `content/docs/<locale>/...` (`i18n.parser: 'dir'`). */
function parseLocalizedFile(filePath: string, contentDir: string) {
  const relative = path
    .relative(contentDir, filePath)
    .split(path.sep)
    .join("/");
  const [locale, ...rest] = relative.split("/");
  const languages: readonly string[] = i18n.languages;

  if (!locale || !languages.includes(locale)) {
    throw new Error(`Expected a locale directory in ${relative}`);
  }

  return {
    locale,
    slugs: getSlugs(rest.join("/")),
  };
}

function mergeMeta(a: UrlMeta, b: UrlMeta): UrlMeta {
  const hashes = [...new Set([...(a.hashes ?? []), ...(b.hashes ?? [])])];
  const queries = [...(a.queries ?? []), ...(b.queries ?? [])];
  return {
    ...(hashes.length > 0 ? { hashes } : {}),
    ...(queries.length > 0 ? { queries } : {}),
  };
}

function addDefaultLocaleAliases(scanned: ScanResult) {
  const prefix = `/${i18n.defaultLanguage}`;

  for (const [url, meta] of [...scanned.urls.entries()]) {
    if (url !== prefix && !url.startsWith(`${prefix}/`)) continue;

    const aliased = url === prefix ? "/" : url.slice(prefix.length);
    const existing = scanned.urls.get(aliased);
    scanned.urls.set(aliased, existing ? mergeMeta(existing, meta) : meta);
  }
}

function addContentUrls(scanned: ScanResult, files: RoutedFile[]) {
  for (const item of files) {
    const existing = scanned.urls.get(item.file.url ?? "");
    const meta: UrlMeta = { hashes: item.hashes };
    scanned.urls.set(
      item.file.url ?? "",
      existing ? mergeMeta(existing, meta) : meta,
    );
  }
}

function addTrailingSlashAliases(scanned: ScanResult) {
  for (const [url, meta] of [...scanned.urls.entries()]) {
    if (url === "/") continue;

    const withoutSlash = url.endsWith("/") ? url.slice(0, -1) : url;
    const withSlash = `${withoutSlash}/`;

    if (!scanned.urls.has(withoutSlash)) scanned.urls.set(withoutSlash, meta);
    if (!scanned.urls.has(withSlash)) scanned.urls.set(withSlash, meta);
  }
}

async function addPublicAssets(scanned: ScanResult) {
  for (const url of await listPublicUrls("public")) {
    if (!scanned.urls.has(url)) scanned.urls.set(url, {});
  }
}

async function listPublicUrls(dir: string, prefix = ""): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const urls: string[] = [];

  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      urls.push(
        ...(await listPublicUrls(path.join(dir, entry.name), relative)),
      );
    } else if (entry.isFile()) {
      urls.push(`/${relative}`);
    }
  }

  return urls;
}

void checkLinks();
