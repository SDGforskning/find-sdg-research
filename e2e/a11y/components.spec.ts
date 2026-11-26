import { test } from "@playwright/test";
import {
  expectNoA11yViolations,
  gotoThemed,
  openLanguageSwitcher,
  type Theme,
} from "./helpers";

const themes: Theme[] = ["light", "dark"];

test.describe("Interacted UI WCAG scans", { tag: "@a11y" }, () => {
  for (const theme of themes) {
    test(`open language menu (${theme}) has no WCAG 2.1 AA violations`, async ({
      page,
    }) => {
      await gotoThemed(page, "/om/om-tjenesten", theme);
      await openLanguageSwitcher(page);
      await expectNoA11yViolations(page);
    });
  }
});
