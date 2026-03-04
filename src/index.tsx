import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react';
import {HelmetProvider} from 'react-helmet-async';
import App from './App';
import GlobalStyles from './GlobalStyles';
import {Toaster} from './components/ui/Toaster';
import WebVitals from './WebVitals';
import './i18n/i18n';
import theme from './theme';
import {QueryProvider} from './providers/QueryProvider';
import {AuthProvider} from './providers/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={theme}>
      <HelmetProvider>
        <QueryProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </QueryProvider>
        <Toaster />
        <GlobalStyles />
        <WebVitals showStatusInConsoleLog />
      </HelmetProvider>
    </ChakraProvider>
  </StrictMode>
);
