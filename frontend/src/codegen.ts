import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'schema.gql',
  documents: '**/*.graphql',
  generates: {
    // generate types.ts
    'graphql/types.ts': { plugins: ['typescript'] },
    // generate operations.ts
    'graphql/operations.ts': {
      preset: 'import-types',
      plugins: ['typescript-operations', 'typescript-urql'],
      presetConfig: {
        typesPath: './types',
      },
      config: {
        withHooks: false,
      },
    },
    // generate hooks in separate files - optional
    // hooks: {
    //   preset: 'near-operation-file',
    //   presetConfig: {
    //     extension: '.hooks.tsx',
    //     baseTypesPath: '../types.ts',
    //   },
    //   plugins: ['typescript-urql'],
    //   config: {
    //     withHooks: true,
    //     importOperationTypesFrom: 'Operations',
    //     documentMode: 'external',
    //     importDocumentNodeExternallyFrom: './operations.tsx',
    //   },
    // },
    // 'graphql/generated/graphql.ts': {
    //   plugins: ['typescript', 'typescript-operations', 'typescript-urql'],
    //   config: { withHooks: true },
    // },
    // 'graphql/generated/hooks.ts': {
    //   plugins: ['typescript-urql'],
    // },
  },
}

export default config
