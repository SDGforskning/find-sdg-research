import { defineI18nUI } from "fumadocs-ui/i18n";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { i18n } from "@/lib/i18n";

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: locale === "no" ? "Finn bærekraftsforskning" : "Find SDG research",
      url: locale === "no" ? `/` : "/en",
    },
    githubUrl: "https://github.com/SDGforskning/find-sdg-research",
    links: [
      {
        type: "main",
        text: locale === "no" ? "Søk" : "Search",
        url: `/${locale}/sok`,
      },
      {
        type: "main",
        text: locale === "no" ? "Hjelp" : "Help",
        url: `/${locale}/hjelp/sokehjelp`,
      },
      {
        type: "main",
        text: locale === "no" ? "Om" : "About",
        url: `/${locale}/om/om-tjenesten`,
      },
      {
        type: "main",
        text: locale === "no" ? "Søkestrenger" : "Search strings",
        url: `/${locale}/sokestreng/introduksjon`,
      },
    ],
  };
}

const norwegianUi = {
  displayName: "Norsk",
  search: "Søk dokumentasjon",
  "Choose a language(language switcher)": "Velg språk",
  "Toggle Menu(home layout header)(aria-label)": "Åpne meny",
  "Toggle Theme(theme switcher)(aria-label)": "Bytt tema",
  "Light(theme switcher)(aria-label)": "Lyst tema",
  "Dark(theme switcher)(aria-label)": "Mørkt tema",
  "System(theme switcher)(aria-label)": "Systemtema",
  "Skip to Content(skip link)": "Hopp til innhold",
  "Open Sidebar(sidebar)(aria-label)": "Åpne sidemeny",
  "Close Sidebar(sidebar)(aria-label)": "Lukk sidemeny",
  "Close Sidebar(aria-label)": "Lukk sidemeny",
  "Collapse Sidebar(sidebar)(aria-label)": "Skjul sidemeny",
  "Hide Sidebar(sidebar)": "Skjul sidemeny",
  "Show Sidebar(sidebar)": "Vis sidemeny",
  "Copy Anchor Link(heading anchor)(aria-label)": "Kopier lenke til avsnitt",
  "Copied Anchor Link(heading anchor)(aria-label)":
    "Lenke til avsnitt er kopiert",
  "On this page(table of contents)": "På denne siden",
  "No Headings(table of contents)": "Ingen overskrifter",
  "Table of Contents(inline table of contents)": "Innhold",
  "Next Page(pagination)": "Neste side",
  "Previous Page(pagination)": "Forrige side",
} as const;

export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: "English",
    search: "Search docs",
  },
  no: norwegianUi,
});
