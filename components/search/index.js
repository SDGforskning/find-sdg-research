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

const connector = new Connector({});

const config = {
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    search_fields: {
      result_title: {},
      SDG_topic: {},
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
      "SDG_topic.keyword",
      "SDG_action.keyword",
      "year.keyword",
      "mentionsNorway.keyword",
      "mentionsSDG.keyword"
    ],
    facets: {
      "SDG_topic.keyword": { type: "value" },
      "SDG_action.keyword": { type: "value" },
      "category.keyword": { type: "value" },
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
              <Facet
                field="category.keyword"
                label="Category"
              />
              <Facet
                field="SDG_topic.keyword"
                label="SDG Topic"
              />
              <Facet
                field="SDG_action.keyword"
                label="SDG Action"
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
