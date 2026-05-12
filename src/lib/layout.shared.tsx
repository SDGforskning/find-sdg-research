import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: locale === 'no' ? 'Finn bærekraftsforskning' : 'Find SDG research',
      url: locale === 'no' ? `/` : '/en',
    },
    githubUrl: 'https://github.com/SDGforskning/find-sdg-research',
    links: [
      {
        type: 'main',
        text: locale === 'no' ? 'Søk' : 'Search',
        url: `/${locale}/sok`,
      },
      {
        type: 'main',
        text: locale === 'no' ? 'Hjelp' : 'Help',
        url: `/${locale}/hjelp/sokehjelp`,
      },
      {
        type: 'main',
        text: locale === 'no' ? 'Om' : 'About',
        url: `/${locale}/om/om-tjenesten`,
      },
      {
        type: 'main',
        text: locale === 'no' ? 'Søkestrenger' : 'Search strings',
        url: `/${locale}/sokestreng/introduksjon`,
      },
    ],
  };
}


export const i18nUI = defineI18nUI(i18n, {
  en: {
    displayName: 'English',
    search: 'Search docs'
  },
  no: {
    displayName: 'Norsk',
    search: 'Søk dokumentasjon'
  },
});

