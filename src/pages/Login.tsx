import {Box, Heading, HStack, Image, Input, InputGroup, Text, VStack} from '@chakra-ui/react';
import {RiArrowRightLine} from 'react-icons/ri';
import {Link} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useMemo, useState} from 'react';
import logoUrl from '../assets/logo.svg';
import showPasswordIcon from '../assets/icons/icon-show.svg';
import hidePasswordIcon from '../assets/icons/icon.hide.svg';
import {Button, Card} from '../components';
import {spacing} from '../design-system/spacing';
import {useAuth} from '../context/AuthContext';
import {createLoginSchema, type LoginFormValues} from '../schemas/auth';

export function Login() {
  const {t} = useTranslation();
  const {login, authError, clearAuthError} = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const schema = useMemo(() => createLoginSchema(t), [t]);

  const {
    control,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {username: '', password: ''},
    mode: 'onSubmit',
  });

  const onSubmit = async (data: LoginFormValues) => {
    clearAuthError();
    await login({username: data.username, password: data.password});
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor="fill-gray"
      padding={spacing.page}
      paddingTop={spacing.pageVertical}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={spacing.inline}
        marginBottom={spacing.pageVertical}
      >
        <Image src={logoUrl} alt="" width="37px" height="32px" />
        <Text fontSize="22px" fontWeight="600" color="text-primary" letterSpacing="-0.02em">
          Zentask
        </Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)} noValidate style={{width: '100%', maxWidth: '560px'}}>
        <Card padding={spacing.card}>
          <VStack gap={spacing.stack} align="stretch">
            <Box marginBottom={spacing.section}>
              <Heading
                size="2xl"
                color="text-primary"
                fontWeight="heading.1"
                marginBottom={spacing.section}
                lineHeight="1.3"
              >
                {t('auth.login.welcomeHeading')}
              </Heading>
              <Text fontSize="text.base" color="text-secondary" lineHeight="1.5">
                {t('auth.login.welcomeParagraph')}
              </Text>
            </Box>

            {authError && (
              <Text color="text-danger" fontSize="text.small" role="alert">
                {authError}
              </Text>
            )}

            <Box>
              <Text
                fontSize="text.small"
                color="text-secondary"
                marginBottom={spacing.label}
                fontWeight="text.base"
              >
                <Box as="span" color="text-danger" aria-hidden="true">
                  *{' '}
                </Box>
                {t('auth.username')}
              </Text>
              <Controller
                name="username"
                control={control}
                render={({field, fieldState}) => {
                  const hasError = Boolean(fieldState.error);
                  return (
                    <>
                      <Input
                        {...field}
                        id="login-username"
                        type="text"
                        placeholder={t('auth.usernamePlaceholder')}
                        autoComplete="username"
                        backgroundColor="fill-white"
                        borderColor={hasError ? 'border-danger' : 'border-gray'}
                        borderRadius="4px"
                        height="40px"
                        _focus={{
                          borderColor: hasError ? 'border-danger' : 'border-brand',
                          boxShadow: hasError
                            ? '0 0 0 1px var(--chakra-colors-border-danger)'
                            : '0 0 0 1px var(--chakra-colors-border-brand)',
                        }}
                      />
                      {fieldState.error?.message && (
                        <Text
                          color="text-danger"
                          fontSize="text.small"
                          marginTop={spacing.label}
                          role="alert"
                        >
                          {fieldState.error.message}
                        </Text>
                      )}
                    </>
                  );
                }}
              />
            </Box>

            <Box marginBottom={spacing.field}>
              <Text
                fontSize="text.small"
                color="text-secondary"
                marginBottom={spacing.label}
                fontWeight="text.base"
              >
                <Box as="span" color="text-danger" aria-hidden="true">
                  *{' '}
                </Box>
                {t('auth.password')}
              </Text>
              <Controller
                name="password"
                control={control}
                render={({field, fieldState}) => {
                  const hasError = Boolean(fieldState.error);
                  return (
                    <>
                      <InputGroup
                        endElement={
                          <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            style={{
                              padding: 4,
                              paddingRight: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#4D5667',
                            }}
                          >
                            <Image
                              src={showPassword ? hidePasswordIcon : showPasswordIcon}
                              alt=""
                              width="16px"
                              height="16px"
                            />
                          </button>
                        }
                      >
                        <Input
                          {...field}
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder={t('auth.passwordPlaceholder')}
                          autoComplete="current-password"
                          backgroundColor="fill-white"
                          borderColor={hasError ? 'border-danger' : 'border-gray'}
                          borderRadius="4px"
                          height="40px"
                          _focus={{
                            borderColor: hasError ? 'border-danger' : 'border-brand',
                            boxShadow: hasError
                              ? '0 0 0 1px var(--chakra-colors-border-danger)'
                              : '0 0 0 1px var(--chakra-colors-border-brand)',
                          }}
                        />
                      </InputGroup>
                      {fieldState.error?.message && (
                        <Text
                          color="text-danger"
                          fontSize="text.small"
                          marginTop={spacing.label}
                          role="alert"
                        >
                          {fieldState.error.message}
                        </Text>
                      )}
                    </>
                  );
                }}
              />
            </Box>

            <Button type="submit" disabled={isSubmitting} fullWidth>
              {isSubmitting ? (
                <Box as="span" color="text-white">
                  {t('auth.loading')}
                </Box>
              ) : (
                <HStack gap={spacing.inline} color="text-white">
                  {t('auth.login.link')}
                  <RiArrowRightLine />
                </HStack>
              )}
            </Button>

            <Text
              textAlign="center"
              fontSize="text.small"
              color="text-secondary"
              marginTop={spacing.footer}
            >
              {t('auth.login.noAccount')}{' '}
              <Link to="/register">
                <Box
                  as="span"
                  color="fill-brand"
                  fontWeight="text.alternative"
                  _hover={{textDecoration: 'underline'}}
                >
                  {t('auth.register.link')}
                </Box>
              </Link>
            </Text>
          </VStack>
        </Card>
      </form>
    </Box>
  );
}
