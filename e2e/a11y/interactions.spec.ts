import { expect, test } from "@playwright/test";
import {
  expectVisibleFocusIndicator,
  gotoThemed,
  openLanguageSwitcher,
} from "./helpers";
import { skipLinkRoutes } from "./routes";

test.describe("Keyboard and interaction accessibility", {
  tag: "@a11y",
}, () => {
  for (const route of skipLinkRoutes) {
    test(`skip link on ${route.path} moves focus to main content`, async ({
      page,
    }) => {
      await gotoThemed(page, route.path, "light");

      await page.keyboard.press("Tab");
      const skipLink = page.getByRole("link", { name: route.label });
      await expect(skipLink).toBeFocused();
      await expectVisibleFocusIndicator(skipLink);

      await page.keyboard.press("Enter");
      await expect(page.locator("#nd-page")).toBeFocused();
    });
  }

  test("language switcher navigates to the English locale", async ({
    page,
  }) => {
    await gotoThemed(page, "/om/om-tjenesten", "light");

    await openLanguageSwitcher(page);
    await page.getByRole("button", { name: "English" }).click();

    await expect(page).toHaveURL(/\/en\/om\/om-tjenesten\/?$/);
    await expect(page.locator("#nd-page")).toBeAttached();
  });

  test("theme toggle switches from light to dark", async ({ page }) => {
    await gotoThemed(page, "/om/om-tjenesten", "light");

    const toggle = page.locator("#nd-subnav [data-theme-toggle]");
    await expect(toggle).toHaveAccessibleName("Toggle Theme");
    await expect(toggle.locator(".bg-fd-accent")).toBeVisible();
    await toggle.click();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});

test.describe("Mobile sidebar accessibility", { tag: "@a11y" }, () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile sidebar opens and closes", async ({ page }) => {
    await gotoThemed(page, "/om/om-tjenesten", "light");

    const mobileSidebar = page.locator("#nd-sidebar-mobile");
    const sidebarLink = mobileSidebar.getByRole("link", {
      name: "Om denne tjenesten",
      exact: true,
    });
    const header = page.locator("#nd-subnav");
    const openButton = header.getByRole("button", { name: /open sidebar/i });

    // Notebook drawer starts open below the `md` breakpoint.
    // The drawer covers the header control, so close it from inside the sidebar.
    const sidebarClose = mobileSidebar.getByRole("button", {
      name: /close sidebar/i,
    });

    if (await sidebarClose.isVisible()) {
      await sidebarClose.click();
    }

    await expect(openButton).toBeVisible();
    await openButton.click();
    await expect(mobileSidebar).toHaveAttribute("data-state", "open");
    await expect(sidebarLink).toBeVisible();

    await sidebarClose.click();
    await expect(mobileSidebar).toHaveAttribute("data-state", "closed");
  });
});
