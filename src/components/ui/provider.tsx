'use client';

import {ChakraProvider} from '@chakra-ui/react';
import {ReactNode} from 'react';

import theme from '@/theme';
import {ColorModeProvider} from './color-mode';
import {Toaster} from './toaster';

export function Provider({children}: {children: ReactNode}) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider>
        {children}
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  );
}
