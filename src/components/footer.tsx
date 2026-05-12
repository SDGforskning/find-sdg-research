import { TITLE } from '@/lib/shared';
import { NBIcon } from '@/components/icons/nb';
import { HVLLeftEngLogo } from '@/components/logos/HVLLeftEngLogo'
import { HVLLeftNorLogo } from '@/components/logos/HVLLeftNorLogo'
import { UIBUBLeftEngLogo } from '@/components/logos/UIBUBLeftEngLogo'
import { UIBUBLeftNorLogo } from '@/components/logos/UIBUBLeftNorLogo'
import { UiSLeftEngLogo } from '@/components/logos/UiSLeftEngLogo'
import { UiSLeftNorLogo } from '@/components/logos/UiSLeftNorLogo'

export function Footer({ lang }: { lang: string }) {
  return (
    <footer className='bg-gray-200 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800'>
      <div className="mx-auto my-20 w-full max-w-7xl flex flex-col flex-wrap justify-between gap-4 md:flex-nowrap md:gap-10">
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="w-full md:w-2/4">
            <ul>
              <li>
                <a href={`/${lang}/om/om-tjenesten`}>{lang === 'en' ? 'About the service' : 'Om tjenesten'}</a>
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
    </footer>
  );
}