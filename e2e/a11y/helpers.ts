import AxeBuilder from "@axe-core/playwright";
import { expect, type Locator, type Page } from "@playwright/test";
// `@axe-core/playwright` types its constructor against `playwright-core`'s `Page`.
// A separate nested `playwright-core` patch version is installed under `@playwright/test`,
// so the two `Page` types are structurally incompatible even though the runtime value is
// identical. Import the exact type `AxeBuilder` expects so we can bridge it safely.
import type { Page as PlaywrightCorePage } from "playwright-core";

export type Theme = "light" | "dark";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21aa"] as const;

// Browser axe (and RGAA) also flag these; they are best-practice, not WCAG tags.
const EXTRA_BEST_PRACTICE_RULES = [
  "landmark-one-main",
  "region",
  "heading-order",
  "aria-allowed-role",
] as const;

const THIRD_PARTY_URL =
  /stats\.uib\.no|panopto|googletagmanager|google-analytics|doubleclick/;

type AxeNode = {
  html: string;
  target: string[];
  failureSummary?: string;
};

type AxeViolation = {
  id: string;
  impact?: string | null;
  help: string;
  helpUrl: string;
  nodes: AxeNode[];
};

export function formatViolations(violations: AxeViolation[]): string {
  if (violations.length === 0) return "No accessibility violations";

  return violations
    .map((violation) => {
      const nodes = violation.nodes
        .map((node) => {
          const summary = node.failureSummary
            ? `\n    ${node.failureSummary}`
            : "";
          return `  - ${node.target.join(" ")}\n    ${node.html.slice(0, 200)}${summary}`;
        })
        .join("\n");

      return `${violation.id} (${violation.impact ?? "unknown"}): ${violation.help}\n${violation.helpUrl}\n${nodes}`;
    })
    .join("\n\n");
}

export async function preparePage(page: Page): Promise<void> {
  await page.route(THIRD_PARTY_URL, (route) => route.abort());
}

export async function gotoThemed(
  page: Page,
  path: string,
  theme: Theme,
): Promise<void> {
  await preparePage(page);
  await page.emulateMedia({ colorScheme: theme });
  await page.addInitScript((nextTheme: Theme) => {
    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {
      // Ignore storage failures in restricted contexts.
    }
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
  }, theme);

  await page.goto(path, { waitUntil: "load" });
  // Home layout uses #nd-nav. Docs notebook layout uses #nd-subnav.
  await page
    .locator("#nd-nav, #nd-subnav")
    .first()
    .waitFor({ state: "attached" });
  await applyThemeClass(page, theme);
  await page.locator("body").waitFor({ state: "visible" });
}

export async function applyThemeClass(page: Page, theme: Theme): Promise<void> {
  await page.evaluate((nextTheme) => {
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
  }, theme);

  const html = page.locator("html");
  if (theme === "dark") {
    await expect(html).toHaveClass(/dark/);
  } else {
    await expect(html).not.toHaveClass(/dark/);
  }
}

export async function expectNoA11yViolations(
  page: Page,
  options?: { include?: string; exclude?: string[] },
): Promise<void> {
  // Third-party embeds (Panopto) are out of our control; scan our chrome around them instead.
  // Bridge the two structurally-equivalent `Page` types (see import note above).
  let builder = new AxeBuilder({ page: page as unknown as PlaywrightCorePage })
    .withTags([...WCAG_TAGS])
    .exclude("iframe");

  if (options?.include) {
    builder = builder.include(options.include);
  }

  for (const selector of options?.exclude ?? []) {
    builder = builder.exclude(selector);
  }

  const results = await builder.analyze();
  const violations = results.violations as AxeViolation[];

  // Full-page scans only: these rules are document-level or best-practice.
  if (!options?.include) {
    let extraBuilder = new AxeBuilder({
      page: page as unknown as PlaywrightCorePage,
    })
      .withRules([...EXTRA_BEST_PRACTICE_RULES])
      .exclude("iframe");

    for (const selector of options?.exclude ?? []) {
      extraBuilder = extraBuilder.exclude(selector);
    }

    const extraResults = await extraBuilder.analyze();
    violations.push(...(extraResults.violations as AxeViolation[]));
  }

  expect(violations, formatViolations(violations)).toEqual([]);
}

export function languageSwitcher(page: Page): Locator {
  return page.locator("#nd-nav, #nd-subnav").getByRole("button", {
    name: /choose a language|velg språk/i,
  });
}

/** Open with the keyboard so the popover is not closed by pointerleave. */
export async function openLanguageSwitcher(page: Page): Promise<Locator> {
  const trigger = languageSwitcher(page).filter({ visible: true });
  const english = page.getByRole("button", { name: "English" });

  await expect(trigger).toBeVisible();
  await expect(async () => {
    if (await english.isVisible()) return;
    await trigger.press("Enter");
    await expect(english).toBeVisible({ timeout: 1_000 });
  }).toPass({ timeout: 10_000 });

  return trigger;
}

export async function expectVisibleFocusIndicator(
  locator: Locator,
): Promise<void> {
  await expect(locator).toBeFocused();

  const visible = await locator.evaluate((element) => {
    const style = getComputedStyle(element);
    const outlineVisible =
      style.outlineStyle !== "none" &&
      Number.parseFloat(style.outlineWidth) > 0;
    const shadowVisible = style.boxShadow !== "none" && style.boxShadow !== "";
    const ringVisible =
      style.getPropertyValue("--tw-ring-width") !== "" &&
      Number.parseFloat(style.getPropertyValue("--tw-ring-width") || "0") > 0;

    return outlineVisible || shadowVisible || ringVisible;
  });

  expect(
    visible,
    "Expected a visible focus indicator (outline, box-shadow, or ring)",
  ).toBe(true);
}
