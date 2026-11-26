import { createHash } from "node:crypto";
import path from "node:path";

export const CODE_QUALITY_REPORT_PATH = "gl-code-quality-report.json";

export type LinkCheckError = {
  url: string;
  line: number;
  column: number;
  reason: string | Error;
};

export type LinkCheckResult = {
  file: string;
  errors: LinkCheckError[];
};

export type CodeQualityIssue = {
  description: string;
  check_name: string;
  fingerprint: string;
  severity: "major";
  location: {
    path: string;
    lines: { begin: number };
  };
};

export function toCodeQualityReport(
  results: LinkCheckResult[],
  cwd = process.cwd(),
): CodeQualityIssue[] {
  return results.flatMap((result) => {
    const filePath = toRepoPath(result.file, cwd);

    return result.errors.map((error) => {
      const reason = reasonLabel(error.reason);
      const line = Number.isInteger(error.line)
        ? error.line
        : Math.trunc(error.line);

      return {
        description: `Broken internal link ${error.url} (${reason})`,
        check_name: `mdx-link/${reason}`,
        fingerprint: fingerprint(
          filePath,
          error.url,
          line,
          error.column,
          reason,
        ),
        severity: "major" as const,
        location: {
          path: filePath,
          lines: { begin: line },
        },
      };
    });
  });
}

function toRepoPath(file: string, cwd: string): string {
  const relative = path.isAbsolute(file) ? path.relative(cwd, file) : file;
  return relative.replaceAll("\\", "/").replace(/^\.\//, "");
}

function reasonLabel(reason: string | Error): string {
  return reason instanceof Error ? reason.message : reason;
}

function fingerprint(
  filePath: string,
  url: string,
  line: number,
  column: number,
  reason: string,
): string {
  return createHash("sha256")
    .update(`${filePath}\0${url}\0${line}\0${column}\0${reason}`)
    .digest("hex");
}
