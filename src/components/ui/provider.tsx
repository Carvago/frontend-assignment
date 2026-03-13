'use client';

import {ChakraProvider} from '@chakra-ui/react';
import theme from '@/theme';
import {ReactNode} from 'react';

export function Provider({children}: {children: ReactNode}) {
  return <ChakraProvider value={theme}>{children}</ChakraProvider>;
}
