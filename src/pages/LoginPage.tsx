'use client';

import {Box, Text, VStack} from '@chakra-ui/react';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import {Button} from '@components/Button';
import {Input} from '@components/Input';
import {PasswordInput} from '@components/Input';
import IconForward from '@icons/icon-foward.svg';
import {login} from '@/api/auth';

export function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login({username, password});
      router.push('/todos');
    } catch {
      setUsername('');
      setPassword('');
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
                It's good to have you back!
              </Text>
              <Text fontSize="text.base" fontWeight="text.base" color="text-secondary">
                Welcome to our secure portal! To access the full functionality of our app, kindly provide your credentials below. Your privacy is our priority.
              </Text>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack gap="4" align="stretch">
                <Input
                  label="Username"
                  required
                  name="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                <PasswordInput
                  label="Password"
                  required
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="solid"
                  width="100%"
                  disabled={isLoading}
                  rightIcon={<IconForward width={16} height={16} />}
                >
                  {isLoading ? 'Logging in...' : 'Log in'}
                </Button>
              </VStack>
            </form>

            <Text fontSize="text.small" color="text-secondary" textAlign="center">
              Don't have an account?{' '}
              <Link href="/register" style={{color: 'var(--chakra-colors-fill-brand)', fontWeight: 'var(--chakra-font-weights-text-alternative)'}}>
                Sign up
              </Link>
            </Text>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
