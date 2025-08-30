import React from 'react';
import {Navigate} from 'react-router-dom';
import {useToast} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../hooks/useAuth';
import {UserCredentials} from '../api/client';
import {AuthForm} from '../components/forms/AuthForm';

export const LoginPage = () => {
  const {t} = useTranslation();
  const toast = useToast();
  const {isAuthenticated, login, isLoginLoading, loginError} = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/todos" replace />;
  }

  const handleLogin = async (credentials: UserCredentials) => {
    try {
      await login(credentials);
      toast({
        title: t('toasts.success'),
        description: t('toasts.loginSuccess'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      // Error is handled by useAuth hook and displayed via loginError
    }
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
      isLoading={isLoginLoading}
      error={loginError?.message}
    />
  );
};
