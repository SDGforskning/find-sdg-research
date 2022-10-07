import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const TITLE = {
  en: "Find SDG research",
  no: "Finn bærekraftsforskning",
};

export default {
  project: {
    link: 'https://github.com/SDGforskning/SDGstrings_wos'
  },
  docsRepositoryBase: 'https://github.com/SDGforskning/SDGstrings_wos/blob/master',
  titleSuffix: () => {
    const { route, locale } = useRouter()
    if (route === '/') return ''
    return ` – ${TITLE[locale]}`
  },
  logo() {
    const { locale } = useRouter();
    return (
      <>
        <span className="ltr:ml-2 rtl:mr-2 font-extrabold hidden md:inline select-none">
          {TITLE[locale]}
        </span>
      </>
    );
  },
  head() {
    const { locale } = useRouter();
    return (
      <>
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="description" content={TITLE[locale]} />
        <meta name="og:description" content={TITLE[locale]} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:image" content="" />
        <meta name="twitter:site:domain" content="" />
        <meta name="twitter:url" content="" /> */}
        <meta name="og:title" content={TITLE[locale]} />
        {/* <meta name="og:image" content="" /> */}
        <meta name="apple-mobile-web-app-title" content={TITLE[locale]} />
        {/* <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          rel="icon"
          href="/favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        /> */}
      </>
    )
  },
  navigation: {
    prev: true,
    next: true
  },
  /* editLink: {
    text: 'Edit this page on GitHub'
  }, */
  footer: {
    text() {
      const { locale } = useRouter()
      return (
        <>
          [HAUGEVIS MED LOGOER]
          <br />
          Creative Commons Attribution 4.0 ${new Date().getFullYear()} - {TITLE[locale]}
        </>
      )
    }
  },
  i18n: [
    { locale: "no", text: "Norsk" },
    { locale: "en", text: "English" },
  ],
  toc: {
    float: true
  },
  sidebar: {
    defaultMenuCollapsed: true,
    subtitle: ({ title }) => <>{title}</>
  }
} as DocsThemeConfig