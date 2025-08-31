import { Box, Button, VStack, Text, Link, Alert, AlertIcon } from '@chakra-ui/react';
import { FormField } from './FormField';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { UserCredentials } from '../../api/client';
import { FormWrapper } from './FormWrapper';
import { Link as RouterLink } from 'react-router';
import { PasswordField } from './PasswordField';

type Props = {
  title: string;
  description: string;
  submitButtonText: string;
  alternativeText: string;
  alternativeLink: string;
  alternativeLinkText: string;
  onSubmit: (data: UserCredentials) => Promise<void>;
  error?: string;
};

export function AuthForm({
  title,
  description,
  submitButtonText,
  alternativeText,
  alternativeLink,
  alternativeLinkText,
  onSubmit,
  error,
}: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserCredentials>({
    reValidateMode: 'onChange',
  });

  console.log(isSubmitting);

  const handleFormSubmit = async (data: UserCredentials) => {
    await onSubmit(data);
  };

  return (
    <FormWrapper title={title} description={description}>
      <Box as="form" onSubmit={handleSubmit(handleFormSubmit)} w="full" noValidate>
        <VStack spacing={4}>
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <FormField
            label={t('auth.fields.username')}
            name="username"
            register={register('username', {
              required: t('auth.validation.usernameRequired'),
              minLength: {
                value: 3,
                message: t('auth.validation.usernameMinLength'),
              },
            })}
            error={errors.username?.message}
            isRequired
          />

          <PasswordField
            label={t('auth.fields.password')}
            name="password"
            register={register('password', {
              required: t('auth.validation.passwordRequired'),
            })}
            error={errors.password?.message}
            isRequired
          />

          <Button
            type="submit"
            colorScheme="blue"
            size="md"
            w="full"
            isLoading={isSubmitting}
            loadingText={submitButtonText}
          >
            {submitButtonText}
          </Button>
        </VStack>
      </Box>
      <Text textAlign="center" color="text-secondary" textStyle="text.base">
        {alternativeText}{' '}
        <Link
          as={RouterLink}
          to={alternativeLink}
          color="fill-brand"
          fontWeight="text.alternative"
          _hover={{ color: 'fill-brand-hover' }}
        >
          {alternativeLinkText}
        </Link>
      </Text>
    </FormWrapper>
  );
}
