import type { CodegenConfig } from '@graphql-codegen/cli';

const codegenConfig: CodegenConfig = {
  overwrite: true,
  generates: {
    './src/gql/generated/': {
      schema: './schemas/sports.json',
      documents: './src/gql/queries/*.ts',
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        onlyOperationTypes: true,
      },
    },
  },
};

export default codegenConfig;
