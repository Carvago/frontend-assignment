'use client';

import {Box, Text} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';

import {Button} from '@/components/Button';
import {clearTokens} from '@/api/auth';
import {useUser} from '@/context/UserContext';

export function Header() {
  const {user} = useUser();
  const router = useRouter();

  const handleLogout = () => {
    clearTokens();
    router.push('/login');
  };

  return (
    <Box as="header" display="flex" alignItems="center" justifyContent="space-between" py="4">
      <Box display="flex" alignItems="center" gap="2">
        <img src="/logo.svg" alt="Zentask logo" width={36} />
        <Text fontSize="heading.3" fontWeight="heading.2" color="text-primary">
          Zentask
        </Text>
      </Box>

      {user && (
        <Box display="flex" alignItems="center" gap="3">
          <Text fontSize="text.base" fontWeight="text.alternative" color="text-primary">
            {user.username}
          </Text>
          <Button variant="subtle" onClick={handleLogout}>
            Log out
          </Button>
        </Box>
      )}
    </Box>
  );
}
