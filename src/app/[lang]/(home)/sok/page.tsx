import { Search } from '@/components/search';
import { DynamicLink } from 'fumadocs-core/dynamic-link';

export default async function SokPage({ params }: PageProps<'/[lang]/sok'>) {
  const { lang } = await params;
  const isEnglish = lang === 'en';

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 md:py-10">
      <h1 className="mb-4 text-3xl font-bold">{isEnglish ? 'Search' : 'Søk'}</h1>

      <p className="mb-4 text-base leading-7">
        {isEnglish
          ? 'Find publications from Norway related to the Sustainable Development Goals. We currently cover works published from 2015 to 2024, with partial coverage of 2025.'
          : 'Søk etter forskning fra Norge knyttet til bærekraftsmålene (også kjent som "SDGs"). Tjenesten dekker arbeider publisert fra 2015 til 2024. Noen publikasjoner fra 2025 er også med, disse vil bli supplert.'}
      </p>

      <ul className="mb-4 list-disc space-y-2 pl-6 text-base leading-7">
        <li>
          {isEnglish
            ? 'Search using English or Norwegian terms - but search terms are not translated, so search in both languages to get more results.'
            : 'Du kan søke med engelske og/eller norske ord - men søkeordene blir ikke oversatt, så bruk begge språk for å få flest mulig resultater.'}
        </li>
        <li>
          {isEnglish
            ? 'Choose an SDG using the "SDG" filter to get results related to a specific SDG; if you need to narrow down your search further, consider using the "SDG targets" filter (to limit to a target area under the SDG), or use the filters under "More SDG filtering options" (to limit to works related to action).'
            : 'Bruk filteret "Bærekraftsmål" til å velge forskning knyttet til et spesifikt bærekraftsmål (SDG). Hvis du trenger å snevre inn søket ditt ytterligere, kan du bruke filteret "Delmål" (for å avgrense til delmål under bærekraftsmålet), eller filtreringsvalg under "Bærekraftsmål - flere filter" (for å avgrense til publikasjoner som nevner handlingene i bærekraftsmålet).'}
        </li>
      </ul>

      <p className="mb-8 text-base leading-7">
        {isEnglish ? 'If you need help, take a look at ' : 'Om du trenger hjelp, sjekk '}
        <DynamicLink className="underline" href="/[lang]/hjelp/sokehjelp">
          {isEnglish ? 'Search tips' : 'Søkeveiledning'}
        </DynamicLink>
        ,{' '}
        <DynamicLink className="underline" href="/[lang]/hjelp/ofte-stilte-sporsmal">
          {isEnglish ? 'FAQ' : 'Ofte stilte spørsmål'}
        </DynamicLink>
        , {isEnglish ? 'or ' : 'eller '}
        <DynamicLink className="underline" href="/[lang]/om/om-tjenesten">
          {isEnglish ? 'About this service' : 'Om tjenesten'}
        </DynamicLink>
        .
      </p>

      <Search />
    </main>
  );
}
