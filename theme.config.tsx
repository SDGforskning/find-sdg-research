import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { HVLIcon, HVLLogoEng, HVLLogoEngDarkMode, HVLLogoNor, HVLLogoNorDarkMode } from '@components/icons/hvl';
import { UiOIcon } from '@components/icons/uio';
import { UiBIcon, UiBLogoEng } from './components/icons/uib';
import { NBIcon } from '@components/icons/nb';
import { UiSIcon } from '@components/icons/uis';

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
      <div className='flex gap-3 justify-center'>
        <img style={{ width: '24px', height: '24px' }} src='/logo.png' />
        <span className="ltr:ml-2 rtl:mr-2 font-extrabold hidden md:inline select-none">
          {TITLE[locale]}
        </span>
      </div>
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
        {/* <link rel="icon" href="/favicon.svg" type="image/svg+xml" /> */}
        <link rel="icon" href="/logo.png" type="image/png" />
        {/* <link
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
        <div className='w-full flex flex-row gap-10 justify-between'>
          <div className='flex flex-col gap-5'>
            <ul className='flex gap-10'>
              <ul>
                <li>
                  <a href='/guide/about'>{locale === 'en' ? 'About the project' : 'Om prosjektet'}</a>
                </li>
                <li>
                  <a href='/accessibility-statement'>{locale === 'en' ? 'Accessibility statement' : 'Tilgjengelighetserklæring'}</a>
                </li>
              </ul>
              <ul>
                <li>
                  <a href='https://bibliotekutvikling.no/prosjektbank/prosjekt/baerekraftsforskning-for-alle-en-transparent-kartleggings-og-gjenfinningstjeneste/'>
                    {locale === 'en' ? 'Project application (in norwegian)' : 'Prosjektsøknad'}
                  </a>
                </li>
              </ul>
            </ul>
            <div className='text-sm'>
              {`Creative Commons Attribution 4.0 ${new Date().getFullYear()} - ${TITLE[locale]}`}
            </div>
            <div className='flex items-center gap-2 text-sm'>
              <NBIcon height={32} />
              {locale === 'en' ? 'The project is supported by the National Library of Norway.' : 'Prosjektet er støttet av Nasjonalbiblioteket i Norge.'}
            </div>
          </div>
          <div className='flex gap-10'>
            <UiBIcon height={100} />
            <HVLIcon height={100} />
            <UiSIcon height={100} />
          </div>
        </div>
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
    defaultMenuCollapsed: false,
    subtitle: ({ title }) => <>{title}</>
  }
} as DocsThemeConfig