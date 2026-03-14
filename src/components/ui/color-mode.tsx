'use client';

import {ThemeProvider} from 'next-themes';
import type {ThemeProviderProps} from 'next-themes';

//ColorModeProvider to prevent hydratation error
export function ColorModeProvider({children, ...props}: ThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </ThemeProvider>
  );
}
