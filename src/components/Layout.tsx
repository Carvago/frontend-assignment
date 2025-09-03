import {PropsWithChildren} from 'react';
import {Box, Center} from '@chakra-ui/react';
import {Header} from './Header';

export const Layout = ({children}: PropsWithChildren) => (
  <Box
    px={{
      base: '16px',
      lg: '40px',
      xl: '76px',
    }}
    pb="100px"
    alignItems="center"
    bg="#F1F2F6"
    minH="100%"
  >
    <Header />
    <Center as="main">{children}</Center>
  </Box>
);
