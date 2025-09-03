import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {AppRouter} from './components/AppRouter';
import StartWrapper from './components/StartWrapper';

function App() {
  const {i18n, t} = useTranslation();

  return (
    <>
      <Helmet
        titleTemplate={`%s - ${t('app.title')}`}
        defaultTitle={t('app.title')}
        htmlAttributes={{lang: i18n.language}}
      >
        <meta name="description" content={t('app.description')} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>
      <StartWrapper>
        <AppRouter />
      </StartWrapper>
    </>
  );
}

export default App;
