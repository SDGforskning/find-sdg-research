import {
  Facet,
  SearchProvider,
  Results,
  PagingInfo,
  Paging,
  SearchBox
} from "@elastic/react-search-ui";
import {
  Layout as SearchLayout,
  /* SingleLinksFacet, */
  BooleanFacet,
  /* SingleSelectFacet, */
  MultiCheckboxFacet,
  /* Sorting */
} from "@elastic/react-search-ui-views";
import SDGResultView from './SDGResultView'
import ClearFilter from './ClearFilter';
import config from './config'

const Search = () => {
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
                field="OA_status_calc.keyword"
                label="Open Access Status"
              />
              <Facet
                field="nvi_level_historical.keyword"
                label="NVI Level"
              />
              <Facet
                field="category.keyword"
                label="Category"
              />
              <Facet
                field="year.keyword"
                label="Year"
              />
              <Facet
                field="mentionsNorway.keyword"
                label="Mentions Norway"
                view={BooleanFacet}
              />
              <Facet
                field="mentionsSDG.keyword"
                label="Mentions SDG"
                view={BooleanFacet}
              />
              <Facet
                field="SDG_topic.keyword"
                label="SDG Topic"
                show={10}
                view={MultiCheckboxFacet}
                filterType="any"
                isFilterable={true}
              />
              <Facet
                field="SDG_target_topic.keyword"
                label="SDG Topic Target"
                show={10}
                view={MultiCheckboxFacet}
                filterType="any"
                isFilterable={true}
              />
              <Facet
                field="SDG_action.keyword"
                label="SDG Action"
                show={10}
                view={MultiCheckboxFacet}
                filterType="any"
                isFilterable={true}
              />
              <Facet
                field="SDG_target_action.keyword"
                label="SDG Action Target"
                show={10}
                view={MultiCheckboxFacet}
                filterType="any"
                isFilterable={true}
              />
              <Facet
                field="scientific_field_npi.keyword"
                label="Scientific field"
                show={10}
                view={MultiCheckboxFacet}
                filterType="any"
                isFilterable={true}
              />
            </div>
          }
          header={
            <>
              <SearchBox
                autocompleteMinimumCharacters={3}
                autocompleteResults={{
                  linkTarget: "_blank",
                  sectionTitle: "Results",
                  titleField: "result_title",
                  urlField: "result_id",
                  shouldTrackClickThrough: true,
                  clickThroughTags: ["test"]
                }}
                autocompleteSuggestions={true}
                debounceLength={0}
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
