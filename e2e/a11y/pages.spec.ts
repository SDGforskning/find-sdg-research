import { test } from "@playwright/test";
import { expectNoA11yViolations, gotoThemed, type Theme } from "./helpers";
import { a11yRoutes } from "./routes";

const themes: Theme[] = ["light", "dark"];

test.describe("WCAG page scans", { tag: "@a11y" }, () => {
  for (const theme of themes) {
    for (const route of a11yRoutes) {
      test(`${route.name} (${theme}) has no WCAG 2.1 AA violations`, async ({
        page,
      }) => {
        await gotoThemed(page, route.path, theme);
        await route.ready?.(page);
        await expectNoA11yViolations(page);
      });
    }
  }

  test("home (light, reduced motion) has no WCAG 2.1 AA violations", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoThemed(page, "/", "light");
    await expectNoA11yViolations(page);
  });

  test("docs (dark, reduced motion) has no WCAG 2.1 AA violations", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoThemed(page, "/om/om-tjenesten", "dark");
    await expectNoA11yViolations(page);
  });
});
