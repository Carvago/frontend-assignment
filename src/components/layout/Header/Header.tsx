'use client';

import {Avatar, Box, Menu, Portal, Text} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';
import {useTranslation} from 'react-i18next';

import {clearTokens} from '@/api/auth';
import {useUser} from '@/context/UserContext';

export function Header() {
  const {user} = useUser();
  const router = useRouter();
  const {t, i18n} = useTranslation();

  const handleLogout = () => {
    clearTokens();
    router.push('/login');
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
        <Menu.Root>
          <Menu.Trigger asChild>
            <Box
              as="button"
              display="flex"
              alignItems="center"
              gap="2"
              px="3"
              py="2"
              borderRadius="xl"
              _hover={{bg: 'gray.100'}}
              cursor="pointer"
            >
              <Avatar.Root size="sm" colorPalette="blue">
                <Avatar.Fallback name={user.username} />
              </Avatar.Root>
              <Text
                display={{base: 'none', md: 'block'}}
                fontSize="text.base"
                fontWeight="text.alternative"
                color="text-primary"
              >
                {user.username}
              </Text>
            </Box>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minW="160px" borderRadius="xl">
                <Menu.Item value="lang-en" onClick={() => handleChangeLanguage('en')}>
                  🇬🇧 English {i18n.language === 'en' && '✓'}
                </Menu.Item>
                <Menu.Item value="lang-cs" onClick={() => handleChangeLanguage('cs')}>
                  🇨🇿 Čeština {i18n.language === 'cs' && '✓'}
                </Menu.Item>
                <Menu.Item value="logout" color="text-danger" onClick={handleLogout}>
                  {t('header.logout')}
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      )}
    </Box>
  );
}
