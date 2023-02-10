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
      <SearchProvider config={config}>
        <SearchLayout
          bodyHeader={
            <>
              <PagingInfo />
              <Paging />
            </>
          }
          sideContent={
            <div>
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
                    label="SDG Topic"
                    show={20}
                    view={MultiCheckboxFacet}
                    filterType="any"
                  //isFilterable={true}
                  />
                  <p className='mb-8 -mt-1 text-xs'>
                    <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/en/hjelp/sokehjelp#sdg-topic-sdg-topic-target" target={'_blank'} rel={'noreferrer'}>What does this mean?</Link>
                  </p>
                  <Facet
                    field="SDG_target_topic_en.keyword"
                    label={"SDG Topic, targets"}
                    show={10}
                    view={MultiCheckboxFacet}
                    filterType="any"
                    isFilterable={true}
                  />
                  <Facet
                    field="SDG_action_en.keyword"
                    label={"SDG Action"}
                    show={20}
                    view={MultiCheckboxFacet}
                    filterType="any"
                  //isFilterable={true}
                  />
                  <p className='mb-8 -mt-1 text-xs'>
                    <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/en/hjelp/sokehjelp#sdg-action-sdg-action-target" target={'_blank'} rel={'noreferrer'}>What does this mean?</Link>
                  </p>
                  <Facet
                    field="SDG_target_action_en.keyword"
                    label={"SDG Action, targets"}
                    show={10}
                    view={MultiCheckboxFacet}
                    filterType="any"
                    isFilterable={true}
                  />
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
                    label="SDG tema"
                    show={20}
                    view={MultiCheckboxFacet}
                    filterType="any"
                  //isFilterable={true}
                  />
                  <p className='mb-8 -mt-1 text-xs'>
                    <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/hjelp/sokehjelp#sdg-tema-og-tema-delmål" target={'_blank'} rel={'noreferrer'}>Hva betyr dette?</Link>
                  </p>
                  <Facet
                    field="SDG_target_topic_no.keyword"
                    label={"SDG tema, delmål"}
                    show={10}
                    view={MultiCheckboxFacet}
                    filterType="any"
                    isFilterable={true}
                  />
                  <Facet
                    field="SDG_action_no.keyword"
                    label={"SDG handling"}
                    show={20}
                    view={MultiCheckboxFacet}
                    filterType="any"
                  //isFilterable={true}
                  />
                  <p className='mb-8 -mt-1 text-xs'>
                    <InformationCircleIcon className='w-4 h-4 inline' /> <Link href="/hjelp/sokehjelp#sdg-handling-og-handling-delmål" target={'_blank'} rel={'noreferrer'}>Hva betyr dette?</Link>
                  </p>
                  <Facet
                    field="SDG_target_action_no.keyword"
                    label={"SDG handling, delmål"}
                    show={10}
                    view={MultiCheckboxFacet}
                    filterType="any"
                    isFilterable={true}
                  />
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
            <>
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
                          ? "Search within publication title, e.g. wind power"
                          : "Søk i publikasjonstittel, f.eks. vindkraft"}
                        onChange={(e) => onChange(e.target.value)}
                      />
                      <button
                        className='!bg-blue-700 text-white font-bold border-white rounded py-3 px-5'
                        type="submit"
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
            </>
          }
          bodyContent={<Results resultView={SDGResultView} />}
          bodyFooter={
            <>
              <PagingInfo />
              <Paging />
            </>
          }
        />
      </SearchProvider>
    </div>
  );
};

export default Search;
