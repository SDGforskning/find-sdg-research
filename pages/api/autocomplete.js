import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import { indexName, host, apikey } from "../../lib/config";

const connector = new ElasticsearchAPIConnector({
  host: host,
  index: indexName,
  apiKey: apikey,
});

export default async function handler(req, res) {
  const { requestState, queryConfig } = req.body;
  const response = await connector.onAutocomplete(requestState, queryConfig);
  res.json(response);
}