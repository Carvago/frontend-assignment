import type {ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const QueryProvider = ({children}: {children: ReactNode}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
