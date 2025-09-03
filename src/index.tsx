import {ChakraProvider} from '@chakra-ui/react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import App from './App';
import GlobalStyles from './GlobalStyles';
import WebVitals from './WebVitals';
import './i18n/i18n';
import theme from './theme';
import {QueryProvider} from './providers/QueryProvider';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <QueryProvider>
        <HelmetProvider>
          <App />
          <GlobalStyles />
          <WebVitals showStatusInConsoleLog />
        </HelmetProvider>
      </QueryProvider>
    </ChakraProvider>
  </StrictMode>
);
