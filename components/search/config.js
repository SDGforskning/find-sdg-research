import Connector from "../../services/APIConnector";
const connector = new Connector({});

const config = {
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    search_fields: {
      result_title: {},
      journal: {},
      result_title_antology: {},
      SDG_topic_no: {},
      SDG_topic_en: {},
      SDG_target_topic_no: {},
      SDG_target_topic_en: {},
      SDG_action_no: {},
      SDG_action_en: {},
      SDG_target_action_no: {},
      SDG_target_action_en: {},
    },
    result_fields: {
      year: { raw: {} },
      result_id: { raw: {} },
      result_title: { raw: {} },
      journal: { raw: {} },
      fulltext_found: { raw: {} },
      OA_status_calc: { raw: {} },
      SDG_action_no: { raw: {} },
      SDG_action_en: { raw: {} },
      SDG_topic_no: { raw: {} },
      SDG_topic_en: { raw: {} },
      SDG_target_action_no: { raw: {} },
      SDG_target_action_en: { raw: {} },
      SDG_target_topic_no: { raw: {} },
      SDG_target_topic_en: { raw: {} },
      publication_type_no: { raw: {} },
      publication_type_en: { raw: {} },
      publication_subtype_no: { raw: {} },
      publication_subtype_en: { raw: {} },
      doi: { raw: {} },
      eissn: { raw: {} },
      fulldoi: { raw: {} },
      fulltextlink: { raw: {} },
      language_no: { raw: {} },
      language_en: { raw: {} },
      mentions_no: { raw: {} },
      mentions_en: { raw: {} },
      NVI_level_no: { raw: {} },
      NVI_level_en: { raw: {} },
      nvi_publication_form: { raw: {} },
      scientific_field_NPI_no: { raw: {} },
      scientific_field_NPI_en: { raw: {} },
      scientific_result: { raw: {} },
    },
    // OR FACETS!!!!
    disjunctiveFacets: [
      "year.keyword",
      "publication_type_no.keyword",
      "publication_type_en.keyword",
      "publication_subtype_no.keyword",
      "publication_subtype_en.keyword",
      "scientific_field_NPI_no.keyword",
      "scientific_field_NPI_en.keyword",
      "mentions_no.keyword",
      "mentions_en.keyword",
    ],
    facets: {
      "fulltext_found.keyword": { type: "value" },
      "language_no.keyword": { type: "value" },
      "language_en.keyword": { type: "value" },
      "OA_status_calc.keyword": { type: "value" },
      "nvi_level_no.keyword": { type: "value" },
      "nvi_level_en.keyword": { type: "value" },
      "SDG_topic_no.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_topic_en.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_target_topic_no.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_target_topic_en.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_action_no.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_action_en.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_target_action_no.keyword": { type: "value", size: 30, sort: "count" },
      "SDG_target_action_en.keyword": { type: "value", size: 30, sort: "count" },
      "publication_type_no.keyword.keyword": { type: "value" },
      "publication_type_en.keyword.keyword": { type: "value" },
      "publication_subtype_no.keyword": { type: "value" },
      "publication_subtype_en.keyword": { type: "value" },
      "scientific_field_NPI_no.keyword": { type: "value" },
      "scientific_field_NPI_en.keyword": { type: "value" },
      "scientific_result.keyword": { type: "value" },
      "year.keyword": { type: "value" },
      "mentions_no.keyword": { type: "value" },
      "mentions_en.keyword": { type: "value" },
    }
  },
  /* autocompleteQuery: {
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
  } */
};

export default config