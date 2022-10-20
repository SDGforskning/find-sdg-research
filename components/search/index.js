import Connector from "../../services/APIConnector";
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
  SingleLinksFacet,
  BooleanFacet,
  SingleSelectFacet,
  MultiCheckboxFacet,
  Sorting
} from "@elastic/react-search-ui-views";
import SDGResultView from './SDGResultView'
import ClearFilter from './ClearFilter';

const connector = new Connector({});

const config = {
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    search_fields: {
      result_title: {},
      SDG_topic: {},
      SDG_target_topic: {},
      SDG_action: {},
      SDG_target_action: {},
      category: {},
    },
    result_fields: {
      result_title: { raw: {} },
      journal: { raw: {} },
      OA_status_calc: { raw: {} },
      SDG_action: { raw: {} },
      SDG_topic: { raw: {} },
      SDG_target_action: { raw: {} },
      SDG_target_topic: { raw: {} },
      category: { raw: {} },
      doi: { raw: {} },
      eissn: { raw: {} },
      fulldoi: { raw: {} },
      fulltextlink: { raw: {} },
      language: { raw: {} },
      mentionsNorway: { raw: {} },
      mentionsSDG: { raw: {} },
      nvi_level_historical: { raw: {} },
      nvi_publication_form: { raw: {} },
      result_id: { raw: {} },
      result_title: { raw: {} },
      scientific_field_npi: { raw: {} },
      scientific_result: { raw: {} },
      year: { raw: {} },
    },
    disjunctiveFacets: [
      "category.keyword",
      /* "SDG_topic.keyword",
      "SDG_target_topic.keyword",
      "SDG_action.keyword",
      "SDG_target_action.keyword", */
      "year.keyword",
      "mentionsNorway.keyword",
      "mentionsSDG.keyword"
    ],
    facets: {
      "OA_status_calc.keyword": { type: "value" },
      "nvi_level_historical.keyword": { type: "value" },
      "SDG_topic.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_target_topic.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_action.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_target_action.keyword": { type: "value", size: 30, sort: "count" },
      "category.keyword": { type: "value" },
      "scientific_field_npi.keyword": { type: "value" },
      "year.keyword": { type: "value" },
      "mentionsSDG.keyword": { type: "value" },
      "mentionsNorway.keyword": { type: "value" },
    }
  },
  autocompleteQuery: {
    results: {
      search_fields: {
        search_as_you_type: {}
      },
      resultsPerPage: 5,
      result_fields: {
        result_title: {
          snippet: {
            size: 100,
            fallback: true
          }
        },
        result_id: {
          raw: {}
        }
      }
    },
    suggestions: {
      types: {
        documents: {
          fields: ["parks_completion"]
        }
      },
      size: 4
    }
  }
};

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
