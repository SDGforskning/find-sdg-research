import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'
import { NBIcon } from '@components/icons/nb';
import { UIBUBLeftEngLogo } from '@components/logos/UIBUBLeftEngLogo';
import { UIBUBLeftNorLogo } from '@components/logos/UIBUBLeftNorLogo';
import { HVLLeftEngLogo } from '@components/logos/HVLLeftEngLogo';
import { HVLLeftNorLogo } from '@components/logos/HVLLeftNorLogo';
import { UiSLeftNorLogo } from '@components/logos/UiSLeftNorLogo';
import { UiSLeftEngLogo } from '@components/logos/UiSLeftEngLogo';
import { format } from 'date-fns'
import { enGB, nb } from 'date-fns/locale'

const TITLE = {
  en: "Find SDG research",
  no: "Finn bærekraftsforskning",
};

export default {
  banner: {
    key: "sdg-v1",
    text: () => {
      const { locale } = useRouter()
      return (
        <>
          <a className='underline underline-offset-8' href='https://skjemaker.app.uib.no/view.php?id=13744102'>{locale === 'en' ? 'Do you have a few minutes to give us feedback on this service? Click here' : 'Har du mulighet å gi oss tilbakemelding på tjenesten? Klikk her'}</a>
        </>
      )
    },
  },
  project: { /* link: 'https://github.com/SDGforskning/find-sdg-research' */ },
  docsRepositoryBase: 'https://github.com/SDGforskning/find-sdg-research/blob/master',
  useNextSeoProps() {
    const { asPath, locale } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: `%s – ${TITLE[locale]}`
      }
    }
  },
  logo() {
    const { locale } = useRouter();
    return (
      <div className='flex gap-3 justify-center items-center'>
        <span className="font-extrabold select-none uppercase max-sm:leading-[1.1]">
          {TITLE[locale]}
        </span>
        <div className='border-r border-neutral-700'>{<>&nbsp;</>}</div>
        <img style={{ width: '24px', height: '24px' }} src='/logo.png' alt='' />
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
  editLink: {
    text() {
      const { locale } = useRouter()
      return (
        <>
          {locale === 'en' ? 'Edit this page' : 'Rediger denne siden'}
        </>
      )
    }
  },
  feedback: {
    content() {
      const { locale } = useRouter()
      return (
        <>
          {locale === 'en' ? 'Question? Give us feedback →' : 'Spørsmål? Gi oss tilbakemelding →'}
        </>
      )
    }
  },
  footer: {
    text() {
      const { locale } = useRouter()
      return (
        <div className='w-full flex flex-col gap-4 md:gap-10 flex-wrap md:flex-nowrap justify-between'>
          <div className='flex flex-col md:flex-row gap-5'>
            <div className='w-full md:w-2/4'>
              <ul className='flex gap-10'>
                <ul>
                  <li>
                    <a href='/om/om-tjenesten'>{locale === 'en' ? 'About the service' : 'Om tjenesten'}</a>
                  </li>
                  <li>
                    <a href='/tilgjengelighetserklaring'>{locale === 'en' ? 'Accessibility statement' : 'Tilgjengelighetserklæring'}</a>
                  </li>
                </ul>
              </ul>
              <div className='text-sm mt-3'>
                {`Creative Commons Attribution 4.0 ${new Date().getFullYear()} - ${TITLE[locale]}`}
              </div>
            </div>

            <div className='w-full md:w-2/4 flex flex-col just-between gap-2'>
              <div className='flex items-center gap-2 text-sm'>
                <img style={{ width: '24px', height: '24px' }} src='/logo.png' alt='' />
                {locale === 'en'
                  ? 'Find SDG Research supports the Sustainable Development Goals'
                  : 'Finn Bærekraftsforskning støtter FNs bærekraftsmål'}
              </div>
              <div className='flex items-center gap-2 text-sm'>
                <NBIcon height={32} />
                {locale === 'en'
                  ? 'The project is supported by the National Library of Norway'
                  : 'Prosjektet er støttet av Nasjonalbiblioteket'}
              </div>
            </div>
          </div>

          <div className='md:flex contents md:flex-row items-baseline gap15 md:gap-16'>
            <div className='md:w-5/12 w-full -ml-3'>
              {locale === 'en' ? <UIBUBLeftEngLogo /> : <UIBUBLeftNorLogo />}
            </div>
            <div className='md:w-4/12 w-2/4'>
              {locale === 'en' ? <HVLLeftEngLogo /> : <HVLLeftNorLogo />}
            </div>
            <div className='md:w-3/12 w-6/12'>
              {locale === 'en' ? <UiSLeftEngLogo /> : <UiSLeftNorLogo />}
            </div>
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
    title: () => {
      const { locale } = useRouter()
      return (
        <>
          {locale === 'en' ? 'On this page' : 'På denne siden'}
        </>
      )
    },
    float: true,
  },
  gitTimestamp({ timestamp }) {
    const { locale } = useRouter()
    return (
      <>
        {locale === 'en' ? `Last updated ${format(timestamp, 'LLLL d, yyyy', { locale: enGB })}` : `Sist oppdatert ${format(timestamp, 'd. LLLL yyyy', { locale: nb })}`}
      </>
    )
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
    titleComponent: ({ title }) => <>{title}</>
  }
} as DocsThemeConfig
