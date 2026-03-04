import {Box, Menu, Portal, Text} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {Icon} from '../../../components/ui/Icon';

type QuickActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
};

export const QuickActions = ({onEdit, onDelete}: QuickActionsProps) => {
  const {t} = useTranslation();

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Box
          as="button"
          color="text-tertiary"
          cursor="pointer"
          bg="transparent"
          border="none"
          p={1}
          display="flex"
          alignItems="center"
          borderRadius="sm"
          _hover={{bg: 'fill-gray'}}
        >
          <Icon name="more" />
        </Box>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="120px">
            <Menu.Item value="edit" onClick={onEdit} gap={2} fontSize="text.small" px={3} py={2}>
              <Icon name="edit" size={14} />
              <Text>{t('task.actions.edit')}</Text>
            </Menu.Item>
            <Menu.Item
              value="delete"
              onClick={onDelete}
              gap={2}
              fontSize="text.small"
              color="text-danger"
              px={3}
              py={2}
            >
              <Icon name="delete" size={14} />
              <Text>{t('task.actions.delete')}</Text>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
