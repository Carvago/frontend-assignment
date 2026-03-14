import {Box} from '@chakra-ui/react';
import {ReactNode} from 'react';

import {UserProvider} from '@/context/UserContext';

export default function AppLayout({children}: {children: ReactNode}) {
  return (
    <UserProvider>
      <Box minH="100vh" bg="fill-gray" p="4">
        <Box maxW="1100px" mx="auto">
          {children}
        </Box>
      </Box>
    </UserProvider>
  );
}
