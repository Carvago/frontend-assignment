import {ChakraProvider} from '@chakra-ui/react';
import {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from 'react-helmet-async';
import App from './App';
import GlobalStyles from './GlobalStyles';
import WebVitals from './WebVitals';
import './i18n/i18n';
import theme from './theme';
import {QueryProvider} from './providers/QueryProvider';
import {AppInitializer} from './components/AppInitializer';

const MOUNT_NODE = document.getElementById('root');

ReactDOM.render(
  <StrictMode>
    <QueryProvider>
      <AppInitializer>
        <ChakraProvider theme={theme} resetCSS>
          <HelmetProvider>
            <App />
            <GlobalStyles />
            <WebVitals showStatusInConsoleLog />
          </HelmetProvider>
        </ChakraProvider>
      </AppInitializer>
    </QueryProvider>
  </StrictMode>,
  MOUNT_NODE
);
