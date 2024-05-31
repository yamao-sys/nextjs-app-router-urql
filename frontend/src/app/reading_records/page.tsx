import { registerUrql } from '@urql/next/rsc'
import { cacheExchange, createClient, fetchExchange } from 'urql'
import {
  ReadingRecordsQuery,
  ReadingRecordsDocument,
  ReadingRecordsQueryVariables,
} from '@/graphql/operations'

const makeClient = () => {
  return createClient({
    url: 'http://backend:8000/graphql',
    requestPolicy: 'cache-and-network',
    exchanges: [cacheExchange, fetchExchange],
  })
}

export default async function ReadingRecords() {
  const { getClient } = registerUrql(makeClient)
  const result = await getClient().query<ReadingRecordsQuery, ReadingRecordsQueryVariables>(
    ReadingRecordsDocument,
    {},
  )
  // QueryのhooksがまさかのClient Component限定...それはそうか
  // https://reacthustle.com/blog/how-to-set-up-graphql-urql-client-with-next-js-13-server-components
  // createClientは使うけど、使用するクエリは自動生成されたクエリを使うようにすれば良いかな
  // fetchingとかerrorを除けば良いかな
  // const [{ data, fetching, error }] = useReadingRecordsQuery()

  // if (fetching) return <p>Loading...</p>
  // if (error) return <p>ERROR!!</p>
  console.log(result.data)
  return (
    <>
      <div>bbb</div>
    </>
  )
}
