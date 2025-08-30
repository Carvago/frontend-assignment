import React, {PropsWithChildren} from 'react';
import {Box, Center} from '@chakra-ui/react';
import {Header} from './Header';

export const Layout = ({children}: PropsWithChildren) => (
  <Box
    px={{
      base: '8px',
      lg: '40px',
      xl: '76px',
    }}
    alignItems="center"
    bg="#F1F2F6"
    h="100%"
  >
    <Header />
    <Center as="main">{children}</Center>
  </Box>
);
