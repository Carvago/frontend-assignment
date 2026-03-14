'use client';

import {Box, Menu, Portal, Text} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';

import {Checkbox} from '@/components/Checkbox';
import IconMore from '@icons/icon-more.svg';
import IconEdit from '@icons/icon-edit.svg';
import IconDelete from '@icons/icon-delete.svg';
import type {Todo} from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export function TodoItem({todo, onToggle, onDelete}: TodoItemProps) {
  const router = useRouter();

  return (
    <Box display="flex" alignItems="flex-start" justifyContent="space-between" py="4" gap="3">
      <Box display="flex" alignItems="flex-start" gap="3" flex="1">
        <Box pt="1px">
          <Checkbox checked={todo.completed} onChange={() => onToggle(todo)} />
        </Box>
        <Box cursor="pointer" onClick={() => router.push(`/todos/${todo.id}`)}>
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
                    Edit
                  </Box>
                </Menu.Item>
              )}
              <Menu.Item value="delete" color="text-danger" onClick={() => onDelete(todo.id)}>
                <Box display="flex" alignItems="center" gap="2">
                  <IconDelete width={16} height={16} />
                  Delete
                </Box>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  );
}
