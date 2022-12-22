import Client from "@searchkit/api";

const client = Client({
  connection: {
    host: process.env.ES_HOST,
    apiKey: process.env.ES_APIKEY,
  },
  search_settings: {
    highlight_attributes: ["result_title"],
    search_attributes: [
      "result_title",
    ],
    result_attributes: [
      "result_title",
      "journal",
      "openlinkfound",
      "OA_status_calc",
      "SDG_action",
      "SDG_topic",
      "SDG_target_action",
      "SDG_target_topic",
      "category",
      "subcategory",
      "doi",
      "eissn",
      "fulldoi",
      "fulltextlink",
      "language",
      "mentionssdgno",
      "mentionsNorway",
      "mentionsSDG",
      "nvi_level_historical",
      "nvi_publication_form",
      "result_id",
      "result_title",
      "scientific_field_npi",
      "scientific_result",
      "year",
    ],
    facet_attributes: [
      { attribute: "openlinkfound", field: "openlinkfound.keyword", type: "string" },
      { attribute: "language", field: "language.keyword", type: "string" },
      { attribute: "OA_status_calc", field: "OA_status_calc.keyword", type: "string" },
      { attribute: "nvi_level_historical", field: "nvi_level_historical.keyword", type: "string" },
      { attribute: "SDG_topic", field: "SDG_topic.keyword", type: "string" },
      { attribute: "SDG_target_topic", field: "SDG_target_topic.keyword", type: "string" },
      { attribute: "SDG_action", field: "SDG_action.keyword", type: "string" },
      { attribute: "SDG_target_action", field: "SDG_target_action.keyword", type: "string" },
      { attribute: "category", field: "category.keyword", type: "string" },
      { attribute: "subcategory", field: "subcategory.keyword", type: "string" },
      { attribute: "scientific_field_npi", field: "scientific_field_npi.keyword", type: "string" },
      { attribute: "scientific_result", field: "scientific_result.keyword", type: "string" },
      { attribute: "year", field: "year.keyword", type: "string" },
      { attribute: "mentionssdgno", field: "mentionssdgno.keyword", type: "string" },
    ],
  },
});

export default async function handler(req, res) {
  const results = await client.handleRequest(req.body);
  res.send(results);
}