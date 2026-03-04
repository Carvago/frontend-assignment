import {RouterProvider} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {router} from './routes/router';

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
      </Helmet>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
