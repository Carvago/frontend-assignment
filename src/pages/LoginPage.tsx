import {useState} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {Box, Flex, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '../components/ui/Button';
import {Card} from '../components/ui/Card';
import {PasswordField} from '../components/ui/PasswordField';
import {TextField} from '../components/ui/TextField';
import {PageLayout} from '../components/layout/PageLayout';
import {useAuth} from '../providers/AuthProvider';
import {PATHS} from '../routes/paths';
import {loginSchema, type LoginFormData} from '../utils/schemas';

export const LoginPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {login, isAuthenticated} = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {username: '', password: ''},
  });

  if (isAuthenticated) {
    return <Navigate to={PATHS.OVERVIEW} replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      await login(data.username, data.password);
      navigate(PATHS.OVERVIEW);
    } catch {
      setError('root', {message: t('error.invalidCredentials')});
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <Flex justify="center" align="center" minH="calc(100vh - 112px)">
        <Box w="100%" maxW="560px">
          <Card>
            <Flex direction="column" gap={6}>
              <Text fontWeight="heading.1" fontSize="heading.2" color="text-primary">
                {t('auth.login.heading')}
              </Text>
              <Text fontSize="text.base" color="text-secondary" lineHeight="24px">
                {t('auth.login.subtitle')}
              </Text>
            </Flex>

            <Flex as="form" direction="column" gap={6} onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="username"
                control={control}
                render={({field}) => (
                  <TextField
                    label={t('auth.field.username')}
                    required
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.username?.message && t(errors.username.message)}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({field}) => (
                  <PasswordField
                    label={t('auth.field.password')}
                    required
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.password?.message && t(errors.password.message)}
                  />
                )}
              />

              {errors.root && (
                <Text fontSize="text.small" color="text-danger">
                  {errors.root.message}
                </Text>
              )}

              <Button type="submit" icon="forward" loading={loading} fullWidth>
                {t('auth.login.button')}
              </Button>
            </Flex>

            <Text fontSize="text.small" color="text-tertiary" textAlign="center">
              <Text asChild color="fill-brand">
                <Link to={PATHS.REGISTER}>{t('auth.login.registerLink')}</Link>
              </Text>
            </Text>
          </Card>
        </Box>
      </Flex>
    </PageLayout>
  );
};
