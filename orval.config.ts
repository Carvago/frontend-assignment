import {defineConfig} from 'orval';

export default defineConfig({
  zentask: {
    input: {
      target: './backend/swagger/openApi.json',
    },
    output: {
      target: './src/api/generated.ts',
      client: 'react-query',
      mode: 'single',
      httpClient: 'axios',
      override: {
        mutator: {
          path: './src/api/client.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
        },
      },
    },
  },
});
