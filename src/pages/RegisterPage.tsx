'use client';

import {Box, Text, VStack} from '@chakra-ui/react';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {ValidationError} from 'yup';
import {Button} from '@components/Button';
import {Input} from '@components/Input';
import {PasswordInput} from '@components/Input';
import IconForward from '@icons/icon-foward.svg';
import {register} from '@/api/auth';
import {registerSchema} from '@/validation/registerSchema';

type FormErrors = {
  username?: string;
  password?: string;
  confirmPassword?: string;
};

export function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await registerSchema.validate({username, password, confirmPassword}, {abortEarly: false});
    } catch (err) {
      if (err instanceof ValidationError) {
        const fieldErrors: FormErrors = {};
        err.inner.forEach(e => {
          if (e.path) fieldErrors[e.path as keyof FormErrors] = e.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsLoading(true);
    try {
      await register({username, password});
      router.push('/todos');
    } catch {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
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
                Create an account
              </Text>
              <Text fontSize="text.base" fontWeight="text.base" color="text-secondary">
                Join Zentask today! Fill in your details below to get started and take control of your tasks.
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack gap="4" align="stretch">
                <Input
                  label="Username"
                  required
                  name="username"
                  value={username}
                  error={errors.username}
                  onChange={e => setUsername(e.target.value)}
                />
                <PasswordInput
                  label="Password"
                  required
                  name="password"
                  value={password}
                  error={errors.password}
                  onChange={e => setPassword(e.target.value)}
                />
                <PasswordInput
                  label="Confirm password"
                  required
                  name="confirmPassword"
                  value={confirmPassword}
                  error={errors.confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="solid"
                  width="100%"
                  disabled={isLoading}
                  rightIcon={<IconForward width={16} height={16} />}
                >
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </Button>
              </VStack>
            </form>

            <Text fontSize="text.small" color="text-secondary" textAlign="center">
              Already have an account?{' '}
              <Link href="/login" style={{color: 'var(--chakra-colors-fill-brand)', fontWeight: 'var(--chakra-font-weights-text-alternative)'}}>
                Log in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
