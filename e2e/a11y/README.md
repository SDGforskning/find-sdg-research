# Accessibility tests

Playwright + `@axe-core/playwright` against a **production** build (`next start`). Dev-server hydration is not reliable enough for these checks.

```bash
npx playwright install chromium   # first time
npm run build
npm run test:a11y
```

Playwright starts the app on port **3005** so a local `next dev` is left alone. Override with `PLAYWRIGHT_PORT`, or skip starting a server with `PLAYWRIGHT_BASE_URL`.

Set `CI=1` in pipelines for retries, a single worker, and an HTML report without auto-open.

GitHub Actions job **`a11y`** (`.github/workflows/ci.yml`) runs `next build` and `npm run test:a11y` on pull requests and `main`, but only when **`tarjelavik`** triggered the workflow (`github.actor`). The HTML report is saved as a workflow artifact. The job sets placeholder `ES_HOST` and `ES_APIKEY` values. It does not decrypt `.env`. Real Elasticsearch credentials stay in Vercel.

## What is covered

| Spec                   | What it checks                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `pages.spec.ts`        | axe WCAG 2.1 A/AA on the routes in `routes.ts`, light and dark; reduced-motion on home and docs |
| `components.spec.ts`   | axe after opening the language menu                                                             |
| `interactions.spec.ts` | skip-link Tab/Enter on docs pages; language switcher; theme toggle; mobile sidebar              |

Panopto iframes are excluded from axe. Docs search is turned off in `RootProvider`, so these tests do not cover a Fumadocs search dialog. Publication search is the page at `/sok`.

Norwegian pages use Norwegian names for the Fumadocs chrome (`Hopp til innhold`, `Bytt tema`, `Åpne sidemeny`). English pages keep the English names.

## Adding a page scan

1. Add an entry to `a11yRoutes` in `routes.ts`.
2. If the page has delayed UI (embed), pass a `ready` wait.
3. Keep the list small: one example per layout or interactive pattern, not every MDX file.

## Not automated (keep these manual)

- Screen readers (VoiceOver / NVDA)
- 200% zoom / reflow
- Captions and audio description on embedded videos
