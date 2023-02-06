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
import MappedLabelsFacet from './MappedLabelsFacet'
import ClearFilter from './ClearFilter'
import config from './config'
import { sdgActionLabelMapping, sdgActionTargetLabelMapping, sdgTopicLabelMapping, sdgTopicTargetLabelMapping } from 'lib/sdgMappings'
import { mentionsMapping } from 'lib/mentionsMapping'
import { npifagfeltMapping } from 'lib/npifagfeltMapping'
import { categoryMapping, subcategoryMapping } from 'lib/pubtypeMappings'
import { languageMapping } from 'lib/languageMapping'
import { useRouter } from 'next/router'


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
              <Facet
                field="fulltext_found.keyword"
                label={locale === 'en' ? "Fulltext found" : "Fulltekst funnet"}
                view={BooleanFacet}
              />
              {/* <Facet
                field="OA_status_calc.keyword"
                label="Open Access Status"
              /> */}
              {locale === 'en' ? (
                <>
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
                  <Facet
                    field="SDG_target_topic_en.keyword"
                    label={"SDG Topic, targets"}
                    show={5}
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
                  <Facet
                    field="SDG_target_action_en.keyword"
                    label={"SDG Action, targets"}
                    show={5}
                    view={MultiCheckboxFacet}
                    filterType="any"
                    isFilterable={true}
                  />
                  <Facet
                    field="scientific_result.keyword"
                    label={"Scientific (NVI)"}
                    view={BooleanFacet}
                  />
                  {<Facet
                    field="publication_type_en.keyword"
                    label={"Publication type"}
                    view={MultiCheckboxFacet}
                  />}
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
                  <Facet
                    field="SDG_target_topic_no.keyword"
                    label={"SDG tema, delmål"}
                    show={5}
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
                  <Facet
                    field="SDG_target_action_no.keyword"
                    label={"SDG handling, delmål"}
                    show={5}
                    view={MultiCheckboxFacet}
                    filterType="any"
                    isFilterable={true}
                  />
                  <Facet
                    field="scientific_result.keyword"
                    label={"Vitenskapelig (NVI)"}
                    view={BooleanFacet}
                  />
                  {<Facet
                    field="publication_type_no.keyword"
                    label={"Publikasjonstype"}
                    view={MultiCheckboxFacet}
                  />}
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
              {/* <Sorting /> */}
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
