import {Box, Flex, HStack, Image, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import logoUrl from '../assets/logo.svg';
import {MenuButton} from './MenuButton';
import {PopupMenu} from './PopupMenu';
import {spacing, spacingScale} from '../design-system/spacing';
import {useAuth} from '../context/AuthContext';
import {displayName} from '../utils';
import {useNavigate} from '@tanstack/react-router';

export function DashboardHeader() {
  const {t} = useTranslation();
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const trigger = (
    <button
      type="button"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        borderRadius: 8,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--chakra-colors-fill-gray)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Box
        width="40px"
        height="40px"
        borderRadius="full"
        backgroundColor="fill-white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxShadow="0 1px 2px rgba(0,0,0,0.1)"
        _hover={{backgroundColor: 'fill-gray-hover'}}
        transition="background-color 0.25s"
      >
        <Text fontSize="text.base" fontWeight="600" color="text-primary">
          {user?.username.charAt(0).toUpperCase()}
        </Text>
      </Box>
      <Text
        fontSize="text.base"
        color="text-primary"
        fontWeight="text.alternative"
        display={{base: 'none', sm: 'block'}}
        _hover={{color: 'text-secondary'}}
        transition="color 0.25s"
      >
        {user ? displayName(user.username) : ''}
      </Text>
    </button>
  );

  return (
    <Flex
      as="header"
      maxWidth="1320px"
      marginX="auto"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
      paddingX={{base: spacingScale[4], sm: spacing.page}}
      paddingY={{base: spacingScale[6], sm: spacing.pageVertical}}
    >
      <HStack gap={spacing.inline} cursor="pointer" onClick={() => navigate({to: '/'})}>
        <Image src={logoUrl} alt="" width="37px" height="32px" />
        <Text fontSize="22px" fontWeight="600" color="text-primary" letterSpacing="-0.02em">
          Zentask
        </Text>
      </HStack>
      {user && (
        <PopupMenu trigger={trigger} placement="bottom-end">
          {(close) => (
            <>
              <MenuButton
                disabled
                onClick={() => {
                  close();
                  // TODO: should open settings modal (not in the scope of this assignment)
                  console.log('settings');
                }}
              >
                {t('menu.settings')}
              </MenuButton>
              <MenuButton
                onClick={() => {
                  close();
                  logout();
                }}
              >
                {t('menu.logout')}
              </MenuButton>
            </>
          )}
        </PopupMenu>
      )}
    </Flex>
  );
}
