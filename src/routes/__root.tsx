import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {Outlet, createRootRoute} from '@tanstack/react-router';
import {AuthProvider} from '../context/AuthContext';
import {NotFound} from '../pages/NotFound';

const queryClient = new QueryClient();

function RootComponent() {
  const {i18n, t} = useTranslation();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Helmet
          titleTemplate={`%s - ${t('app.title')}`}
          defaultTitle={t('app.title')}
          htmlAttributes={{lang: i18n.language}}
        >
          <meta name="description" content={t('app.description')} />
        </Helmet>
        <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
