export const indexName = 'sdg-20250806075122'

export const host = assertValue(
  process.env.ES_HOST,
  'Missing environment variable: ES_HOST'
)

export const apikey = assertValue(
  process.env.ES_APIKEY,
  'Missing environment variable: ES_APIKEY'
)

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
