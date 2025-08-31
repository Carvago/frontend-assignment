import { useTranslation } from 'react-i18next';
import { UserCredentials } from '../api/client';
import { AuthForm } from '../components/forms/AuthForm';
import { useRegisterMutation } from '../api/mutations';

export const RegisterPage = () => {
  const { t } = useTranslation();
  const { mutateAsync: register } = useRegisterMutation();

  const handleRegister = async (credentials: UserCredentials) => {
    await register(credentials);
  }

  return (
    <AuthForm
      title={t('auth.register.title')}
      description={t('auth.login.description')}
      submitButtonText={t('auth.register.submitButton')}
      alternativeText={t('auth.register.alternativeText')}
      alternativeLink="/login"
      alternativeLinkText={t('auth.register.alternativeLink')}
      onSubmit={handleRegister}
    />
  );
};
