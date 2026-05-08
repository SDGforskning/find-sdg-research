import Script from 'next/script'
import { Noto_Sans } from 'next/font/google'
import './globals.css'

import { NBIcon } from '@components/icons/nb'
import { HVLLeftEngLogo } from '@components/logos/HVLLeftEngLogo'
import { HVLLeftNorLogo } from '@components/logos/HVLLeftNorLogo'
import { UIBUBLeftEngLogo } from '@components/logos/UIBUBLeftEngLogo'
import { UIBUBLeftNorLogo } from '@components/logos/UIBUBLeftNorLogo'
import { UiSLeftEngLogo } from '@components/logos/UiSLeftEngLogo'
import { UiSLeftNorLogo } from '@components/logos/UiSLeftNorLogo'
import { getPageMap } from 'nextra/page-map'
import { Footer, LastUpdated, Layout, LocaleSwitch, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'

export const TITLE = {
  en: 'Find SDG research',
  no: 'Finn bærekraftsforskning'
}

const notoSans = Noto_Sans({
  subsets: ['latin'],
  display: 'swap'
})

export default async function RootLayout({ children, params }) {
  const { lang } = await params
  const pageMap = await getPageMap(`/${lang}`)

  const navbar = (
    <Navbar
      logo={
        <div className="flex items-center justify-center gap-3">
          <span className="max-sm:leading-[1.1] select-none font-extrabold uppercase">{TITLE[lang]}</span>
          <div className="border-r border-neutral-700">{<>&nbsp;</>}</div>
          <img style={{ width: '24px', height: '24px' }} src="/logo.png" alt="" />
        </div>
      }
    >
      <LocaleSwitch lite />
    </Navbar>
  )

  return (
    <html lang={lang} dir="ltr" suppressHydrationWarning>
      <Head />
      <body className={notoSans.className}>
        <Banner storageKey="sdg-feedback">
          <a className="underline underline-offset-8" href="https://skjemaker.app.uib.no/view.php?id=13744102">
            {lang === 'en'
              ? 'Do you have a few minutes to give us feedback on this service? Click here'
              : 'Har du mulighet a gi oss tilbakemelding pa tjenesten? Klikk her'}
          </a>
        </Banner>
        <Layout
          pageMap={pageMap}
          navbar={navbar}
          toc={{
            title: lang === 'en' ? 'On this page' : 'Pa denne siden'
          }}
          i18n={[
            { locale: 'en', name: 'English' },
            { locale: 'no', name: 'Norsk' }
          ]}
          copyPageButton={false}
          feedback={{
            content: lang === 'en' ? "Question? Give us feedback →" : "Spørsmål? Gi oss tilbakemelding →"
          }}
          editLink={lang === 'en' ? "Edit this page" : "Rediger denne siden"}
          search={null}
          lastUpdated={<LastUpdated locale={lang === 'en' ? 'en-GB' : 'nb-NO'}>{lang === 'en' ? 'Last updated' : 'Sist oppdatert'}</LastUpdated>}
        >
          {children}
          <Footer>
            <div className="w-full max-w-(--nextra-content-width) mx-auto flex flex-col flex-wrap justify-between gap-4 md:flex-nowrap md:gap-10">
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="w-full md:w-2/4">
                  <ul>
                    <li>
                      <a href="/om/om-tjenesten">{lang === 'en' ? 'About the service' : 'Om tjenesten'}</a>
                    </li>
                    <li>
                      <a href="https://uustatus.no/nb/erklaringer/publisert/20b383fa-3a0f-4835-98c4-44ccf0a1bcb7">
                        {lang === 'en' ? 'Accessibility statement' : 'Tilgjengelighetserklaering'}
                      </a>
                    </li>
                  </ul>
                  <div className="mt-3 text-sm">{`Creative Commons Attribution 4.0 ${new Date().getFullYear()} - ${TITLE[lang]}`}</div>
                </div>

                <div className="flex w-full flex-col gap-2 md:w-2/4">
                  <div className="flex items-center gap-2 text-sm">
                    <img style={{ width: '24px', height: '24px' }} src="/logo.png" alt="" />
                    {lang === 'en'
                      ? 'Find SDG Research supports the Sustainable Development Goals'
                      : 'Finn Baerekraftsforskning stotter FNs baerekraftsmal'}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <NBIcon height={32} />
                    {lang === 'en'
                      ? 'The project is supported by the National Library of Norway'
                      : 'Prosjektet er stottet av Nasjonalbiblioteket'}
                  </div>
                </div>
              </div>

              <div className="contents items-baseline gap15 md:flex md:flex-row md:gap-16">
                <div className="-ml-3 w-full md:w-5/12">{lang === 'en' ? <UIBUBLeftEngLogo /> : <UIBUBLeftNorLogo />}</div>
                <div className="w-2/4 md:w-4/12">{lang === 'en' ? <HVLLeftEngLogo /> : <HVLLeftNorLogo />}</div>
                <div className="w-6/12 md:w-3/12">{lang === 'en' ? <UiSLeftEngLogo /> : <UiSLeftNorLogo />}</div>
              </div>
            </div>
          </Footer>
        </Layout>
      </body>
    </html >
  )
}
