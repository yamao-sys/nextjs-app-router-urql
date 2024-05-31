export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type CreateReadingRecordInput = {
  /** 読んだ本の感想 */
  impression?: InputMaybe<Scalars['String']['input']>
  /** 読んだ本の学んだこと */
  learnedContent?: InputMaybe<Scalars['String']['input']>
  /** 読んだ本のtitle */
  title: Scalars['String']['input']
}

export type Mutation = {
  __typename?: 'Mutation'
  createReadingRecord: ReadingRecord
  removeReadingRecord: ReadingRecord
  updateReadingRecord: ReadingRecord
}

export type MutationCreateReadingRecordArgs = {
  createReadingRecordInput: CreateReadingRecordInput
}

export type MutationRemoveReadingRecordArgs = {
  id: Scalars['Int']['input']
}

export type MutationUpdateReadingRecordArgs = {
  updateReadingRecordInput: UpdateReadingRecordInput
}

export type Query = {
  __typename?: 'Query'
  readingRecord: ReadingRecord
  readingRecords: Array<ReadingRecord>
}

export type QueryReadingRecordArgs = {
  id: Scalars['Int']['input']
}

export type ReadingRecord = {
  __typename?: 'ReadingRecord'
  /** 読書記録のID */
  id: Scalars['Int']['output']
  /** 読んだ本の感想 */
  impression?: Maybe<Scalars['String']['output']>
  /** 読んだ本の学んだこと */
  learnedContent?: Maybe<Scalars['String']['output']>
  /** 読んだ本のtitle */
  title: Scalars['String']['output']
}

export type UpdateReadingRecordInput = {
  id: Scalars['Int']['input']
  /** 読んだ本の感想 */
  impression?: InputMaybe<Scalars['String']['input']>
  /** 読んだ本の学んだこと */
  learnedContent?: InputMaybe<Scalars['String']['input']>
  /** 読んだ本のtitle */
  title?: InputMaybe<Scalars['String']['input']>
}
