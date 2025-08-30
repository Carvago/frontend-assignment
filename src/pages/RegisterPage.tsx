import {Navigate} from 'react-router-dom';
import {useToast} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../hooks/useAuth';
import {UserCredentials} from '../api/client';
import {AuthForm} from '../components/forms/AuthForm';

export const RegisterPage = () => {
  const {t} = useTranslation();
  const toast = useToast();
  const {isAuthenticated, register, isRegisterLoading, registerError} = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  const handleRegister = async (credentials: UserCredentials) => {
    try {
      await register(credentials);
      toast({
        title: t('toasts.success'),
        description: t('toasts.registerSuccess'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Error is handled by useAuth hook and displayed via registerError
    }
  };

  return (
    <AuthForm
      title={t('auth.register.title')}
      description={t('auth.register.description')}
      submitButtonText={t('auth.register.submitButton')}
      alternativeText={t('auth.register.alternativeText')}
      alternativeLink="/login"
      alternativeLinkText={t('auth.register.alternativeLink')}
      onSubmit={handleRegister}
      isLoading={isRegisterLoading}
      error={registerError?.message}
    />
  );
};
