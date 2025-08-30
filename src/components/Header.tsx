import {Box} from '@chakra-ui/react';
import {AppLogo} from './icons';
import {useAuth} from '../hooks/useAuth';
import {Avatar} from './Avatar';

export function Header() {
  const {isAuthenticated} = useAuth();
  return (
    <Box
      as="header"
      h={{
        base: '88px',
        md: '112px',
      }}
      display="flex"
      alignItems="center"
      justifyContent={isAuthenticated ? 'space-between' : 'center'}
    >
      <AppLogo height={32} />

      {isAuthenticated && <Avatar name="John Doe" />}
    </Box>
  );
}
