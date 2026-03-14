import {Box} from '@chakra-ui/react';
import {ReactNode} from 'react';

import {Header} from '@/components/Header';

export default function AppLayout({children}: {children: ReactNode}) {
  return (
    <Box minH="100vh" bg="fill-gray" p="4">
      <Box maxW="1100px" mx="auto">
        <Header />
        {children}
      </Box>
    </Box>
  );
}
