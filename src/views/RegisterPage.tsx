'use client';

import {Box, Text, VStack} from '@chakra-ui/react';
import {type FormEvent} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';

import {Button} from '@/components/ui/Button';
import {Input} from '@/components/ui/Input';
import {PasswordInput} from '@/components/ui/Input';
import IconForward from '@icons/icon-foward.svg';
import {register} from '@/api/auth';
import {registerSchema} from '@/validation/registerSchema';
import {getValidationErrors} from '@/utils/getValidationErrors';
import {useTranslation} from 'react-i18next';
import {useForm} from '@/hooks/useForm';

type FormFields = {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const initialFields: FormFields = {fullName: '', username: '', password: '', confirmPassword: ''};

export function RegisterPage() {
  const router = useRouter();
  const {t} = useTranslation();
  const {fields, errors, setErrors, isLoading, setIsLoading, setField, reset} = useForm(initialFields);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});

    const fieldErrors = await getValidationErrors<Partial<FormFields>>(registerSchema(t), fields);
    if (fieldErrors) {
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await register({username: fields.username, password: fields.password, fullName: fields.fullName});
      router.push('/todos');
    } catch {
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg="fill-gray" display="flex" flexDirection="column" alignItems="center" p="4">

      <Box display="flex" alignItems="center" gap="2" py="6">
        <img src="/logo.svg" alt="Zentask logo" width={36} />
        <Text fontSize="heading.3" fontWeight="heading.2" color="text-primary">
          Zentask
        </Text>
      </Box>

      <Box flex="1" display="flex" alignItems="center" justifyContent="center" width="100%">
        <Box
          bg="fill-white"
          borderRadius="16px"
          p="8"
          width="100%"
          maxW="460px"
          boxShadow="0px 4px 24px rgba(0, 17, 65, 0.08)"
        >
          <VStack gap="6" align="stretch">
            <VStack gap="2" align="start">
              <Text fontSize="heading.2" fontWeight="heading.1" color="text-primary">
                {t('register.title')}
              </Text>
              <Text fontSize="text.base" fontWeight="text.base" color="text-secondary">
                {t('register.subtitle')}
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack gap="4" align="stretch">
                <Input
                  label={t('register.fullName')}
                  required
                  name="fullName"
                  value={fields.fullName}
                  error={errors.fullName}
                  onChange={setField('fullName')}
                />
                <Input
                  label={t('register.username')}
                  required
                  name="username"
                  value={fields.username}
                  error={errors.username}
                  onChange={setField('username')}
                />
                <PasswordInput
                  label={t('register.password')}
                  required
                  name="password"
                  value={fields.password}
                  error={errors.password}
                  onChange={setField('password')}
                />
                <PasswordInput
                  label={t('register.confirmPassword')}
                  required
                  name="confirmPassword"
                  value={fields.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={setField('confirmPassword')}
                />
                <Button
                  type="submit"
                  variant="solid"
                  width="100%"
                  disabled={isLoading}
                  rightIcon={<IconForward width={16} height={16} />}
                >
                  {isLoading ? t('register.submitting') : t('register.submit')}
                </Button>
              </VStack>
            </form>

            <Text fontSize="text.small" color="text-secondary" textAlign="center">
              {t('register.haveAccount')}{' '}
              <Text as="span" color="fill-brand" fontWeight="text.alternative">
                <Link href="/login">{t('register.logIn')}</Link>
              </Text>
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
