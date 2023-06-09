import {
  Facet,
  SearchProvider,
  Results,
  PagingInfo,
  Paging,
  SearchBox
} from "@elastic/react-search-ui"
import {
  Layout as SearchLayout,
  /* SingleLinksFacet, */
  BooleanFacet,
  /* SingleSelectFacet, */
  MultiCheckboxFacet,
  /* Sorting */

} from "@elastic/react-search-ui-views"
import SDGResultView from './SDGResultView'
import ClearFilter from './ClearFilter'
import config from './config'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { InformationCircleIcon } from '@heroicons/react/24/solid'

const Search = () => {
  const { locale } = useRouter()
  return (
    <div className="w-full">
      <SearchProvider config={{
        a11yNotificationMessages: {
          searchResults: ({ start, end, totalResults, searchTerm }) => {
            if (locale === 'en') {
              return `Searching for "${searchTerm}". Showing ${start} to ${end} results out of ${totalResults}.`
            }
            if (locale === 'no') {
              return `Søker for "${searchTerm}". Viser ${start} til ${end} resultat av totalt ${totalResults} treff.`
            }
          }
        },
        ...config,
      }}>
        <SearchLayout
          bodyHeader={
            <>
              <PagingInfo
                view={({ start, end, totalResults }) => (
                  <div className="paging-info">
                    {locale === 'en' ? `Showing ${start} - ${end} out of ${totalResults}` : `Viser ${start} - ${end} av totalt ${totalResults} treff.`}
                  </div>
                )}
              />
              <Paging locale={locale === 'en' ?
                {
                  items_per_page: '/ page',
                  jump_to: 'Go to',
                  jump_to_confirm: 'confirm',
                  page: 'Page',
                  prev_page: 'Previous Page',
                  next_page: 'Next Page',
                  prev_5: 'Previous 5 Pages',
                  next_5: 'Next 5 Pages',
                  prev_3: 'Previous 3 Pages',
                  next_3: 'Next 3 Pages',
                  page_size: 'Page Size',
                } : {
                  items_per_page: '/ side',
                  jump_to: 'Gå til side',
                  page: 'Side',
                  prev_page: 'Forrige side',
                  next_page: 'Neste side',
                  prev_5: '5 forrige',
                  next_5: '5 neste',
                  prev_3: '3 forrige',
                  next_3: '3 neste',
                  page_size: 'sidestørrelse',
                }}
              />
            </>
          }
          sideContent={
            <div id='filters'>
              <h2 className='md:text-lg font-bold'>{locale === 'en' ? 'Filters' : 'Filter'}</h2>
              <a href="#hits" className='not-sr-only'>{locale === 'en' ? 'Skip to results' : 'Gå til resultatene'}</a>
              <ClearFilter />
              {locale === 'en' ? (
                <>
                  <Facet
                    field="fulltext_found.keyword"
                    label={"Fulltext found"}
                    view={BooleanFacet}
                  />

                  <Facet
                    field="scientific_result.keyword"
                    label={"Scientific (NVI)"}
                    view={BooleanFacet}
                  />
                  <p className='mb-8 -mt-1 text-xs'>
                    <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/en/hjelp/sokehjelp#scientific-nvi" target={'_blank'} rel={'noreferrer'}>What does this mean?</Link>
                  </p>

                  <Facet
                    field="language_en.keyword"
                    label="Language"
                    view={MultiCheckboxFacet}
                  />
                  <Facet
                    field="mentions_en.keyword"
                    label="Mentions"
                    view={MultiCheckboxFacet}
                  />
                  <Facet
                    field="SDG_topic_en.keyword"
                    label="SDG"
                    show={20}
                    view={MultiCheckboxFacet}
                    filterType="any"
                  //isFilterable={true}
                  />
                  <p className='mb-8 -mt-1 text-xs'>
                    <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/en/hjelp/sokehjelp#sdg-and-sdg-targets" target={'_blank'} rel={'noreferrer'}>What does this mean?</Link>
                  </p>
                  <Facet
                    field="SDG_target_topic_en.keyword"
                    label={"SDG targets"}
                    show={10}
                    view={MultiCheckboxFacet}
                    filterType="any"
                    isFilterable={true}
                  />

                  <details className='mt-4 mb-8 bg-neutral-100 dark:bg-neutral-800 p-2 rounded'>
                    <summary className='text-sm'>More SDG filtering options
                    </summary>
                    <div className='mt-4'>
                      <Facet
                        field="SDG_action_en.keyword"
                        label={"SDG, action"}
                        show={20}
                        view={MultiCheckboxFacet}
                        filterType="any"
                      //isFilterable={true}
                      />
                      <Facet
                        field="SDG_target_action_en.keyword"
                        label={"SDG targets, action"}
                        show={10}
                        view={MultiCheckboxFacet}
                        filterType="any"
                        isFilterable={true}
                      />
                      <p className='text-xs pt-1'>
                        <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/en/hjelp/sokehjelp#sdg-and-sdg-targets" target={'_blank'} rel={'noreferrer'}>What does this mean?</Link>
                      </p>
                    </div>
                  </details>

                  <Facet
                    field="publication_type_en.keyword"
                    label={"Publication type"}
                    view={MultiCheckboxFacet}
                  />
                  <Facet
                    field="publication_subtype_en.keyword"
                    label={"Publication subtype"}
                    view={MultiCheckboxFacet}
                    show={5}
                  />
                  <Facet
                    field="year.keyword"
                    label={"Year"}
                  />
                  <Facet
                    field="nvi_level_en.keyword"
                    label={"NVI level"}
                    view={MultiCheckboxFacet}
                  />
                  <Facet
                    field="scientific_field_NPI_en.keyword"
                    label={"Scientific field"}
                    view={MultiCheckboxFacet}
                    show={10}
                    filterType="any"
                    isFilterable={true}
                  />
                </>
              ) : (
                <>
                  <Facet
                    field="fulltext_found.keyword"
                    label={"Fulltekst funnet"}
                    view={BooleanFacet}
                  />
                  <Facet
                    field="scientific_result.keyword"
                    label={"Vitenskapelig (NVI)"}
                    view={BooleanFacet}
                  />
                  <p className='mb-8 -mt-1 text-xs'>
                    <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/hjelp/sokehjelp#vitenskapelig-nvi" target={'_blank'} rel={'noreferrer'}>Hva betyr dette?</Link>
                  </p>

                  <Facet
                    field="language_no.keyword"
                    label="Språk"
                    view={MultiCheckboxFacet}
                  />
                  <Facet
                    field="mentions_no.keyword"
                    label="Nevner"
                    view={MultiCheckboxFacet}
                  />
                  <Facet
                    field="SDG_topic_no.keyword"
                    label="Bærekraftsmål"
                    show={20}
                    view={MultiCheckboxFacet}
                    filterType="any"
                  //isFilterable={true}
                  />
                  <p className='mb-8 -mt-1 text-xs'>
                    <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/hjelp/sokehjelp#bærekraftsmål-og-delmål-filter" target={'_blank'} rel={'noreferrer'}>Hva betyr dette?</Link>
                  </p>
                  <Facet
                    field="SDG_target_topic_no.keyword"
                    label={"Delmål"}
                    show={10}
                    view={MultiCheckboxFacet}
                    filterType="any"
                    isFilterable={true}
                  />
                  <details className='mt-4 mb-8 bg-neutral-100 dark:bg-neutral-800 p-2 rounded'>
                    <summary className='text-sm'>Bærekraftsmål - flere filter
                    </summary>
                    <div className='mt-4'>

                      <Facet
                        field="SDG_action_no.keyword"
                        label={"Bærekraftsmål, handling"}
                        show={20}
                        view={MultiCheckboxFacet}
                        filterType="any"
                      //isFilterable={true}
                      />
                      <Facet
                        field="SDG_target_action_no.keyword"
                        label={"Delmål, handling"}
                        show={10}
                        view={MultiCheckboxFacet}
                        filterType="any"
                        isFilterable={true}
                      />
                      <p className='text-xs pt-1'>
                        <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/hjelp/sokehjelp#bærekraftsmål-og-delmål-filter" target={'_blank'} rel={'noreferrer'}>Hva betyr dette?</Link>
                      </p>
                    </div>
                  </details>
                  <Facet
                    field="publication_type_no.keyword"
                    label={"Publikasjonstype"}
                    view={MultiCheckboxFacet}
                  />
                  <Facet
                    field="publication_subtype_no.keyword"
                    label={locale === 'en' ? "Publication subtype" : "Underkategori"}
                    view={MultiCheckboxFacet}
                    show={5}
                  />
                  <Facet
                    field="year.keyword"
                    label={"År"}
                  />
                  <Facet
                    field="nvi_level_historical.keyword"
                    label={"NVI nivå"}
                    view={MultiCheckboxFacet}
                  />
                  <Facet
                    field="scientific_field_NPI_no.keyword"
                    label={"Fagfelt (NPI)"}
                    show={10}
                    view={MultiCheckboxFacet}
                    filterType="any"
                    isFilterable={true}
                  />
                </>

              )}
            </div>
          }
          header={
            <div lang={locale === 'en' ? 'en' : 'no'}>
              <SearchBox
                /* autocompleteMinimumCharacters={3}
                autocompleteResults={{
                  linkTarget: "_blank",
                  sectionTitle: "Results",
                  titleField: "result_title",
                  urlField: "result_id",
                  shouldTrackClickThrough: true,
                  clickThroughTags: ["test"]
                }}
                autocompleteSuggestions={true}
                debounceLength={0} */
                view={({ value, onChange, onSubmit }) => (
                  <div>
                    <form className='w-full flex gap-2' onSubmit={onSubmit}>
                      <input
                        className='flex-grow border border-gray-400 dark:border-white rounded p-3'
                        type="text"
                        value={value}
                        placeholder={locale === 'en'
                          ? "Search within publication title, e.g. fiskeri fishery fisheries"
                          : "Søk i publikasjonstittel, f.eks. fiskeri fishery fisheries"}
                        onChange={(e) => onChange(e.target.value)}
                        aria-labelledby='search-button'
                      />
                      <button
                        className='!bg-green-700 text-white font-bold border-white rounded py-3 px-5'
                        type="submit"
                        id='search-button'
                      >
                        {locale === 'en'
                          ? "Search"
                          : "Søk"}
                      </button>
                    </form>
                  </div>
                )}
              />
              {/* <Sorting
              sortOptions={[
                {
                  name: "Relevance",
                  value: "",
                  direction: ""
                },
                {
                  name: locale === 'en' ? "Title (A-Z)" : "Tittel (A-Å)",
                  value: "title",
                  direction: "asc"
                }
              ]}
               /> */}
            </div>
          }
          bodyContent={
            <div  >
              <h2 id="hits" className='sr-only' style={{ position: 'relative', top: '-150px' }}>{locale === 'en' ? 'Search results' : 'Søkeresultater'}</h2>
              <Results resultView={SDGResultView} />
            </div>
          }
          bodyFooter={
            <>
              <PagingInfo
                view={({ start, end, totalResults }) => (
                  <div className="paging-info">
                    {locale === 'en' ? `Showing ${start} - ${end} out of ${totalResults}` : `Viser ${start} - ${end} av totalt ${totalResults} treff.`}
                  </div>
                )}
              />
              <Paging locale={locale === 'en' ?
                {
                  items_per_page: '/ page',
                  jump_to: 'Go to',
                  jump_to_confirm: 'confirm',
                  page: 'Page',
                  prev_page: 'Previous Page',
                  next_page: 'Next Page',
                  prev_5: 'Previous 5 Pages',
                  next_5: 'Next 5 Pages',
                  prev_3: 'Previous 3 Pages',
                  next_3: 'Next 3 Pages',
                  page_size: 'Page Size',
                } : {
                  items_per_page: '/ side',
                  jump_to: 'Gå til side',
                  page: 'Side',
                  prev_page: 'Forrige side',
                  next_page: 'Neste side',
                  prev_5: '5 forrige',
                  next_5: '5 neste',
                  prev_3: '3 forrige',
                  next_3: '3 neste',
                  page_size: 'sidestørrelse',
                }}
              />
            </>
          }
        />
      </SearchProvider>
    </div>
  );
};

export default Search;
