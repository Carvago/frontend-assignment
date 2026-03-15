import type {Metadata} from 'next';
import {cookies} from 'next/headers';
import {Provider} from '@/components/ui/provider';
import {ReactNode} from 'react';

export const metadata: Metadata = {
  title: 'Carvago Frontend Assignment',
  description: 'Assignment in React.js for developers who want to join our team.',
};

const SUPPORTED_LOCALES = ['en', 'cs'];

export default async function RootLayout({children}: {children: ReactNode}) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('i18next')?.value ?? '';
  const initialLocale = SUPPORTED_LOCALES.includes(cookieLocale) ? cookieLocale : 'en';

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider initialLocale={initialLocale}>{children}</Provider>
      </body>
    </html>
  );
}
