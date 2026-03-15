'use client';

import {ChakraProvider} from '@chakra-ui/react';
import {ReactNode} from 'react';

import theme from '@/theme';
import {ColorModeProvider} from './color-mode';
import {Toaster} from './toaster';
import {I18nProvider} from './I18nProvider';

type Props = {
  children: ReactNode;
  initialLocale: string;
};

export function Provider({children, initialLocale}: Props) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider>
        <I18nProvider initialLocale={initialLocale}>
          {children}
          <Toaster />
        </I18nProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}
