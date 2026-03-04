import type {ReactNode} from 'react';
import {Box} from '@chakra-ui/react';
import {TopBar} from './TopBar';

type PageLayoutProps = {
  children: ReactNode;
  showUserInfo?: boolean;
};

export const PageLayout = ({children, showUserInfo}: PageLayoutProps) => (
  <Box bg="fill-gray" minH="100vh">
    <Box maxW="1360px" mx="auto" px={{base: 2, md: 10}} pb={{base: 10, md: 20}}>
      <TopBar showUserInfo={showUserInfo} />
      {children}
    </Box>
  </Box>
);
