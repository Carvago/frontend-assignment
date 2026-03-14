'use client';

import {ChakraProvider} from '@chakra-ui/react';
import theme from '@/theme';
import {ReactNode} from 'react';
import {Toaster} from './toaster';

export function Provider({children}: {children: ReactNode}) {
  return (
    <ChakraProvider value={theme}>
      {children}
      <Toaster />
    </ChakraProvider>
  );
}
