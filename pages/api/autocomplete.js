import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connector = new ElasticsearchAPIConnector({
  host: process.env.ES_SERVICE_URL,
  index: process.env.ES_SERVICE_INDEX,
  apiKey: process.env.ES_SERVICE_APIKEY,
});

export default async function handler(req, res) {
  const { requestState, queryConfig } = req.body;
  const response = await connector.onAutocomplete(requestState, queryConfig);
  res.json(response);
}