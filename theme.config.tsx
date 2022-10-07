import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const logo = (
  <span>
    {/* <svg
      height="20"
      viewBox="0 0 361 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m64.8833 1.81335-2.8464 2.84638C47.1274 19.5692 22.9543 19.5692 8.04485 4.65972L5.19848 1.81335c-.93479-.93478-2.45037-.93478-3.38515 0-.93479.93478-.93478 2.45037 0 3.38515L4.6597 8.04487c14.9095 14.90953 14.9095 39.08263 0 53.99213l-2.84637 2.8463c-.93479.9348-.93479 2.4504 0 3.3852.93478.9348 2.45037.9348 3.38515 0l2.84637-2.8464c14.90955-14.9095 39.08255-14.9095 53.99205 0l2.8464 2.8464c.9348.9348 2.4504.9348 3.3852 0 .9347-.9348.9347-2.4504 0-3.3852l-2.8464-2.8463c-14.9095-14.9095-14.9095-39.0826 0-53.99213l2.8464-2.84637c.9347-.93478.9347-2.45037 0-3.38515-.9348-.93478-2.4504-.93478-3.3852 0Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg> */}
    Finn Bærekraftsforskning
    <style jsx>{`
      span {
        padding: 0.5rem 0.5rem 0.5rem 0;
        mask-image: linear-gradient(
          60deg,
          blue 25%,
          rgba(0, 59, 0, 0.2) 50%,
          green 75%
        );
        mask-size: 400%;
        mask-position: 0%;
      }
      span:hover {
        mask-position: 100%;
        transition: mask-position 1s ease, -webkit-mask-position 1s ease;
      }
    `}</style>
  </span>
)

export default {
  project: {
    link: 'https://github.com/SDGforskning/SDGstrings_wos'
  },
  docsRepositoryBase: 'https://github.com/SDGforskning/SDGstrings_wos/blob/master',
  titleSuffix: () => {
    const { route } = useRouter()
    if (route === '/') return ''
    return ' – SDG'
  },
  logo,
  head: () => (
    <>
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Nextra: the Next.js site builder" />
      <meta name="og:description" content="Nextra: the Next.js site builder" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://nextra.vercel.app/og.png" />
      <meta name="twitter:site:domain" content="nextra.vercel.app" />
      <meta name="twitter:url" content="https://nextra.vercel.app" />
      <meta name="og:title" content="Nextra: Next.js static site generator" />
      <meta name="og:image" content="https://nextra.vercel.app/og.png" />
      <meta name="apple-mobile-web-app-title" content="Nextra" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
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
      />
    </>
  ),
  /* banner: {
    key: 'someKey',
    text: (
      <a href="" target="_blank">
        Some alert
      </a>
    )
  }, */
  navigation: {
    prev: true,
    next: true
  },
  editLink: {
    text: 'Edit this page on GitHub'
  },
  footer: {
    text: `Creative Commons Attribution 4.0 ${new Date().getFullYear()} - SDG Forskning.`
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