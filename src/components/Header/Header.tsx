'use client';

import {Box, Text} from '@chakra-ui/react';

import {useUser} from '@/context/UserContext';

export function Header() {
  const {user} = useUser();

  return (
    <Box as="header" display="flex" alignItems="center" justifyContent="space-between" py="4">
      <Box display="flex" alignItems="center" gap="2">
        <img src="/logo.svg" alt="Zentask logo" width={36} />
        <Text fontSize="heading.3" fontWeight="heading.2" color="text-primary">
          Zentask
        </Text>
      </Box>

      {user && (
        <Box display="flex" alignItems="center" gap="2">
          <img src="/logo.svg" alt="avatar" width={28} style={{borderRadius: '50%'}} />
          <Text fontSize="text.base" fontWeight="text.alternative" color="text-primary">
            {user.username}
          </Text>
        </Box>
      )}
    </Box>
  );
}
