import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";

const connector = new ElasticsearchAPIConnector({
  host: process.env.ES_HOST,
  index: 'sdg-2023-05-10',
  apiKey: process.env.ES_APIKEY,
});

export default async function handler(req, res) {
  const { requestState, queryConfig } = req.body;
  const response = await connector.onSearch(requestState, queryConfig);
  res.json(response);
}