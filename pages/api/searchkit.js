import Client from "@searchkit/api";

const client = Client({
  connection: {
    host: "https://sdg-sok.ubbe.no/search",
    apiKey: "WDZlSDVZTUJTWThvLTI2VjdmSUM6SHR1bG5BQzNUMnVFc2FBbXUwYTBnZw==",
  },
  search_settings: {
    highlight_attributes: ["result_title"],
    search_attributes: ["result_title"],
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
      { attribute: "SDG_topic", field: "SDG_topic.keyword", "type": "string" },
      { attribute: "SDG_action", field: "SDG_action.keyword", "type": "string" },
    ],
  },
});

export default async function handler(req, res) {
  const results = await client.handleRequest(req.body);
  res.send(results);
}