import {useNavigate} from 'react-router-dom';
import {Avatar, Flex, Menu, Portal, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../../providers/AuthProvider';
import {PATHS} from '../../routes/paths';
import {Icon} from '../ui/Icon';
import logoIcon from '../../assets/icons/logo.svg';

const Logo = () => (
  <Flex alignItems="center" gap={2}>
    <img src={logoIcon} alt="Zentask" width="37" height="32" />
    <Text fontWeight="heading.3" fontSize="heading.3" color="text-primary" letterSpacing="-0.5px">
      Zentask
    </Text>
  </Flex>
);

const UserAvatar = ({name}: {name: string}) => (
  <Avatar.Root
    variant="solid"
    colorPalette="blue"
    w={{base: 10, md: 6}}
    h={{base: 10, md: 6}}
    fontSize="text.small"
    fontWeight="heading.3"
    color="white"
    bg="fill-brand"
  >
    <Avatar.Fallback name={name} />
  </Avatar.Root>
);

const UserMenu = ({username}: {username: string}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    navigate(PATHS.LOGIN);
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Flex alignItems="center" gap={2} cursor="pointer">
          <UserAvatar name={username} />
          <Text display={{base: 'none', md: 'flex'}} fontSize="text.base" color="text-primary">
            {username}
          </Text>
        </Flex>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="120px">
            <Menu.Item
              value="logout"
              onClick={handleLogout}
              gap={2}
              fontSize="text.small"
              color="text-danger"
              px={3}
              py={2}
            >
              <Icon name="logout" size={14} />
              <Text>{t('auth.logout')}</Text>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};

type TopBarProps = {
  showUserInfo?: boolean;
};

export const TopBar = ({showUserInfo = false}: TopBarProps) => {
  const {user} = useAuth();

  return (
    <Flex
      justify="space-between"
      align="center"
      py={{base: 6, md: 10}}
      px={{base: 2, md: 0}}
      w="100%"
    >
      <Logo />
      {showUserInfo && user && <UserMenu username={user.username} />}
    </Flex>
  );
};
