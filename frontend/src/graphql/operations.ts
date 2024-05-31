import gql from 'graphql-tag'
import * as Types from './types'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type ReadingRecordsQueryVariables = Types.Exact<{ [key: string]: never }>

export type ReadingRecordsQuery = {
  __typename?: 'Query'
  readingRecords: Array<{
    __typename?: 'ReadingRecord'
    id: number
    title: string
    learnedContent?: string | null
    impression?: string | null
  }>
}

export const ReadingRecordsDocument = gql`
  query readingRecords {
    readingRecords {
      id
      title
      learnedContent
      impression
    }
  }
`
