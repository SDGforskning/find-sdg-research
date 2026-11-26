import type { Page } from "@playwright/test";

export type A11yRoute = {
  name: string;
  path: string;
  ready?: (page: Page) => Promise<void>;
};

async function waitForEmbeddedVideo(page: Page): Promise<void> {
  await page.locator("iframe").first().waitFor({
    state: "attached",
    timeout: 15_000,
  });
}

/**
 * Representative pages for WCAG scans — not every MDX page.
 * Add a route when you introduce a new layout or interactive pattern.
 *
 * Docs search is disabled (`RootProvider search.enabled: false`). Publication
 * search is the custom page at `/sok`, not the Fumadocs search dialog.
 */
export const a11yRoutes: A11yRoute[] = [
  { name: "home-no", path: "/", ready: waitForEmbeddedVideo },
  { name: "home-en", path: "/en", ready: waitForEmbeddedVideo },
  { name: "docs-about", path: "/om/om-tjenesten" },
  { name: "docs-about-en", path: "/en/om/om-tjenesten" },
  { name: "docs-help", path: "/hjelp/sokehjelp" },
  { name: "docs-search-strings", path: "/sokestreng/introduksjon" },
  { name: "search", path: "/sok" },
];

export const skipLinkRoutes = [
  { path: "/om/om-tjenesten", label: "Skip to Content" },
  { path: "/en/om/om-tjenesten", label: "Skip to Content" },
  { path: "/hjelp/sokehjelp", label: "Skip to Content" },
] as const;
