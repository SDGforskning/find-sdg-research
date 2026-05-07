import ElasticsearchAPIConnector from '@elastic/search-ui-elasticsearch-connector'
import { indexName, host, apikey } from '../../../lib/config'

const connector = new ElasticsearchAPIConnector({
  host,
  index: indexName,
  apiKey: apikey
})

export async function POST(request) {
  try {
    const { requestState, queryConfig } = await request.json()
    const response = await connector.onAutocomplete(requestState, queryConfig)
    return Response.json(response)
  } catch (error) {
    return Response.json(
      { error: 'Failed to execute autocomplete request', detail: String(error) },
      { status: 500 }
    )
  }
}

export function GET() {
  return Response.json({ error: 'Method not allowed' }, { status: 405 })
}
