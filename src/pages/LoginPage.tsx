import { useTranslation } from 'react-i18next';
import { UserCredentials } from '../api/client';
import { AuthForm } from '../components/forms/AuthForm';
import { useLoginMutation } from '../api/mutations';

export const LoginPage = () => {
  const { t } = useTranslation();

  const { mutateAsync: login } = useLoginMutation();

  const handleLogin = async (credentials: UserCredentials) => {
    await login(credentials);
  };

  return (
    <AuthForm
      title={t('auth.login.title')}
      description={t('auth.login.description')}
      submitButtonText={t('auth.login.submitButton')}
      alternativeText={t('auth.login.alternativeText')}
      alternativeLink="/register"
      alternativeLinkText={t('auth.login.alternativeLink')}
      onSubmit={handleLogin}
    />
  );
};
