import {Box} from '@chakra-ui/react';
import {AppLogo} from './icons';
import {Avatar} from './Avatar';
import {useIsLoggedIn} from '../store/useIsLoggedIn';

export function Header() {
  const isLoggedIn = useIsLoggedIn();

  return (
    <Box
      as="header"
      h={{
        base: '88px',
        md: '112px',
      }}
      display="flex"
      alignItems="center"
      justifyContent={isLoggedIn ? 'space-between' : 'center'}
    >
      <AppLogo height={32} />

      {isLoggedIn && <Avatar name="John Doe" />}
    </Box>
  );
}
