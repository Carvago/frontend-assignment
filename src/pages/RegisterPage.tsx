import {useTranslation} from 'react-i18next';
import {UserCredentials} from '../api/client';
import {AuthForm} from '../components/forms/AuthForm';
import {useRegisterMutation} from '../api/login/mutations';
import {getErrorMessage} from '../utils/getErrorMessage';

export const RegisterPage = () => {
  const {t} = useTranslation();
  const {mutate: register, error} = useRegisterMutation();

  const handleRegister = (credentials: UserCredentials) => {
    register(credentials);
  };

  return (
    <AuthForm
      title={t('auth.register.title')}
      description={t('auth.login.description')}
      submitButtonText={t('auth.register.submitButton')}
      alternativeText={t('auth.register.alternativeText')}
      alternativeLink="/login"
      alternativeLinkText={t('auth.register.alternativeLink')}
      onSubmit={handleRegister}
      error={getErrorMessage(error, 'Failed to register. Please try again.')}
    />
  );
};
