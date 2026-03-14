'use client';

import {Box, Separator, Spinner, Text} from '@chakra-ui/react';
import {useRouter} from 'next/navigation';

import {Button} from '@/components/Button';
import {Header} from '@/components/Header';
import {TodoEmptyState} from '@/components/TodoEmptyState';
import {TodoItem} from '@/components/TodoItem';
import {useTodos} from '@/hooks/useTodos';
import {useUser} from '@/context/UserContext';
import {useCurrentDate} from '@/hooks/useCurrentDate';
import IconAdd from '@icons/icon-add.svg';

export function TodosPage() {
  const router = useRouter();
  const {user} = useUser();
  const {todos, isLoading, error, handleToggleComplete, handleDelete} = useTodos();

  const activeTodos = todos.filter((t) => !t.completed);
  const completedTodos = todos.filter((t) => t.completed);

  const formattedDate = useCurrentDate();

  return (
    <>
      <Header />
      <Box bg="fill-white" borderRadius="16px" p="6" boxShadow="0px 4px 24px rgba(0, 17, 65, 0.08)">
        <Box
          display="flex"
          flexDirection={{base: 'column', md: 'row'}}
          alignItems={{base: 'stretch', md: 'center'}}
          justifyContent="space-between"
          gap="4"
          mb="6"
        >
          <Box>
            <Text fontSize="heading.2" fontWeight="heading.1" color="text-primary">
              Hello {user?.username ?? ''}!
            </Text>
            <Text fontSize="text.small" color="text-secondary" mt="1">
              {formattedDate}
            </Text>
          </Box>
          <Button
            variant="solid"
            width={{base: '100%', md: 'auto'}}
            leftIcon={<IconAdd width={16} height={16} />}
            onClick={() => router.push('/todos/new')}
          >
            Add task
          </Button>
        </Box>

        {isLoading && (
          <Box py="10" display="flex" justifyContent="center">
            <Spinner size="lg" color="fill-brand" />
          </Box>
        )}

        {!isLoading && error && (
          <Box py="10" textAlign="center">
            <Text color="text-danger">{error}</Text>
          </Box>
        )}

        {!isLoading && !error && (
          <Box>
            {activeTodos.length === 0 ? (
              <TodoEmptyState />
            ) : (
              <Box>
                <Text fontSize="text.base" fontWeight="text.alternative" color="text-primary" mb="2">
                  To-do
                </Text>
                <Separator />
                {activeTodos.map(todo => (
                  <Box key={todo.id}>
                    <TodoItem todo={todo} onToggle={handleToggleComplete} onDelete={handleDelete} />
                  </Box>
                ))}
              </Box>
            )}

            {completedTodos.length > 0 && (
              <Box mt="6">
                <Text fontSize="text.base" fontWeight="text.alternative" color="text-primary" mb="2">
                  Completed
                </Text>
                <Separator />
                {completedTodos.map(todo => (
                  <Box key={todo.id}>
                    <TodoItem todo={todo} onToggle={handleToggleComplete} onDelete={handleDelete} />
                    <Separator />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
