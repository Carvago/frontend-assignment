'use client';

import {Box, Menu, Portal, Text} from '@chakra-ui/react';
import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useTranslation} from 'react-i18next';

import {Checkbox} from '@/components/ui/Checkbox';
import {ConfirmDialog} from '@/components/ui/ConfirmDialog';
import IconMore from '@icons/icon-more.svg';
import IconEdit from '@icons/icon-edit.svg';
import IconDelete from '@icons/icon-delete.svg';
import type {Todo} from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export function TodoItem({todo, onToggle, onDelete}: TodoItemProps) {
  const router = useRouter();
  const {t} = useTranslation();
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(todo);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const isBusy = isToggling || isDeleting;

  return (
    <>
      <Box display="flex" alignItems="flex-start" justifyContent="space-between" py="4" gap="3">
        <Box display="flex" alignItems="flex-start" gap="3" flex="1">
          <Box pt="1px">
            <Checkbox checked={todo.completed} onChange={handleToggle} disabled={isBusy} />
          </Box>
          <Box
            cursor={isBusy ? 'default' : 'pointer'}
            onClick={() => !isBusy && router.push(`/todos/${todo.id}`)}
            opacity={isBusy ? 0.5 : 1}
          >
            <Text
              fontSize="text.base"
              fontWeight="text.alternative"
              color="text-primary"
              textDecoration={todo.completed ? 'line-through' : 'none'}
            >
              {todo.title}
            </Text>
            {todo.description && (
              <Text fontSize="text.small" color="text-secondary" mt="1">
                {todo.description}
              </Text>
            )}
          </Box>
        </Box>

        <Menu.Root>
          <Menu.Trigger asChild>
            <Box
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="36px"
              height="36px"
              borderRadius="full"
              color="text-secondary"
              _hover={{bg: 'gray.100'}}
              aria-disabled={isBusy}
              pointerEvents={isBusy ? 'none' : 'auto'}
              opacity={isBusy ? 0.4 : 1}
            >
              <IconMore width={20} height={20} />
            </Box>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content minW="160px" borderRadius="xl">
                {!todo.completed && (
                  <Menu.Item value="edit" onClick={() => router.push(`/todos/${todo.id}/edit`)}>
                    <Box display="flex" alignItems="center" gap="2">
                      <IconEdit width={16} height={16} />
                      {t('todoItem.edit')}
                    </Box>
                  </Menu.Item>
                )}
                <Menu.Item value="delete" color="text-danger" onClick={() => setShowConfirm(true)}>
                  <Box display="flex" alignItems="center" gap="2">
                    <IconDelete width={16} height={16} />
                    {t('todoItem.delete')}
                  </Box>
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Box>

      <ConfirmDialog
        open={showConfirm}
        title={t('todoItem.confirmTitle')}
        description={t('todoItem.confirmDescription')}
        confirmLabel={t('todoItem.delete')}
        onConfirm={handleDelete}
        onCancel={() => setShowConfirm(false)}
        isLoading={isDeleting}
      />
    </>
  );
}
