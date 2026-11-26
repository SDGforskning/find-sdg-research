/**
 * Passed to `DocsPage`. Fumadocs sets `id="nd-page"` after these props and
 * wraps the article in `<main>`, so `id` and `role` must stay unset.
 * `tabIndex` is what lets the built-in skip link move focus into the page.
 */
export const docsPageFocusProps = {
  tabIndex: -1,
} as const;

export const docsTocLandmarkProps = {
  container: {
    role: "navigation",
    "aria-labelledby": "toc-title",
  },
} as const;
