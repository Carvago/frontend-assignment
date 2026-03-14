'use client';

import {Box, Text} from '@chakra-ui/react';
import {useEffect, useState} from 'react';

import {Button} from '@/components/Button';
import {TodoEmptyState} from '@/components/TodoEmptyState';
import {useTodos} from '@/hooks/useTodos';
import {getCurrentUser} from '@/api/user';
import type {CurrentUser} from '@/types';
import IconAdd from '@icons/icon-add.svg';

export function TodosPage() {
  const {todos, isLoading, handleToggleComplete, handleDelete} = useTodos();
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    getCurrentUser().then(setUser).catch(() => null);
  }, []);

  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box
      bg="fill-white"
      borderRadius="16px"
      p="6"
      boxShadow="0px 4px 24px rgba(0, 17, 65, 0.08)"
    >
          <Box display="flex" alignItems="center" justifyContent="space-between" mb="6">
            <Box>
              <Text fontSize="heading.2" fontWeight="heading.1" color="text-primary">
                Hello {user?.username ?? ''}!
              </Text>
              <Text fontSize="text.small" color="text-secondary" mt="1">
                {formattedDate}
              </Text>
            </Box>
            <Button variant="solid" leftIcon={<IconAdd width={16} height={16} />}>
              Add task
            </Button>
          </Box>

          {isLoading && (
            <Box py="10" textAlign="center">
              <Text color="text-secondary">Loading...</Text>
            </Box>
          )}

          {!isLoading && todos.length === 0 && <TodoEmptyState />}

          {!isLoading && todos.length > 0 && (
            <Box display="flex" flexDirection="column" gap="3">
              {todos.map(todo => (
                <Box
                  key={todo.id}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p="4"
                  borderRadius="12px"
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <Box display="flex" alignItems="center" gap="3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleComplete(todo)}
                    />
                    <Box>
                      <Text
                        fontSize="text.base"
                        fontWeight="text.alternative"
                        color="text-primary"
                        textDecoration={todo.completed ? 'line-through' : 'none'}
                      >
                        {todo.title}
                      </Text>
                      {todo.description && (
                        <Text fontSize="text.small" color="text-secondary">
                          {todo.description}
                        </Text>
                      )}
                    </Box>
                  </Box>
                  <Button variant="ghost" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </Button>
                </Box>
              ))}
            </Box>
          )}
    </Box>
  );
}
