import type {Metadata} from 'next';
import {Provider} from '@/components/ui/provider';
import {ReactNode} from 'react';

export const metadata: Metadata = {
  title: 'Carvago Frontend Assignment',
  description: 'Assignment in React.js for developers who want to join our team.',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
