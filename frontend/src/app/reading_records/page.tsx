import { registerUrql } from '@urql/next/rsc'
import { cacheExchange, createClient, fetchExchange, gql } from 'urql'

const makeClient = () => {
  return createClient({
    url: 'http://backend:8000/graphql',
    exchanges: [cacheExchange, fetchExchange],
  })
}

const { getClient } = registerUrql(makeClient)

const readingRecordsQuery = gql`
  query {
    readingRecords {
      id
      title
      learnedContent
      impression
    }
  }
`

export default async function ReadingRecords() {
  const result = await getClient().query(readingRecordsQuery, {})
  return (
    <>
      <div>aaa</div>
    </>
  )
}
