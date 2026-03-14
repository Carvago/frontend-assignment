'use client';

import {Box, Separator, Spinner, Text} from '@chakra-ui/react';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

import {Button} from '@/components/Button';
import {Checkbox} from '@/components/Checkbox';
import {Header} from '@/components/Header';
import {getTodo, deleteTodo, completeTodo, incompleteTodo} from '@/api/todos';
import {formatDate} from '@/utils/formatDate';
import IconBackwards from '@icons/icon-backwards.svg';
import IconEdit from '@icons/icon-edit.svg';
import IconDelete from '@icons/icon-delete.svg';
import type {Todo} from '@/types';

type TodoDetailPageProps = {
  id: string;
};

export function TodoDetailPage({id}: TodoDetailPageProps) {
  const router = useRouter();
  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTodo(id)
      .then(data => setTodo(data))
      .catch(() => router.replace('/todos'))
      .finally(() => setIsLoading(false));
  }, [id, router]);

  const handleToggleComplete = async () => {
    if (!todo) return;
    const action = todo.completed ? incompleteTodo : completeTodo;
    await action(todo.id);
    setTodo(prev => prev ? {...prev, completed: !prev.completed} : prev);
  };

  const handleDelete = async () => {
    if (!todo) return;
    await deleteTodo(todo.id);
    router.push('/todos');
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <Box bg="fill-white" borderRadius="16px" p="6" boxShadow="0px 4px 24px rgba(0, 17, 65, 0.08)">
          <Box py="10" display="flex" justifyContent="center">
            <Spinner size="lg" color="fill-brand" />
          </Box>
        </Box>
      </>
    );
  }

  if (!todo) return null;

  return (
    <>
      <Header />
      <Box bg="fill-white" borderRadius="16px" p="6" boxShadow="0px 4px 24px rgba(0, 17, 65, 0.08)">
        <Box display="flex" alignItems="center" gap="3" mb="6">
          <Button variant="subtle" onClick={() => router.back()}>
            <IconBackwards width={16} height={16} />
          </Button>
          <Text fontSize="heading.2" fontWeight="heading.1" color="text-primary">
            {todo.title}
          </Text>
        </Box>

        <Separator mb="6" />

        <Box display="flex" alignItems="flex-start" gap="3" mb="6">
          <Box pt="1px">
            <Checkbox checked={todo.completed} onChange={handleToggleComplete} />
          </Box>
          <Box>
            <Text
              fontSize="heading.3"
              fontWeight="heading.2"
              color="text-primary"
              textDecoration={todo.completed ? 'line-through' : 'none'}
            >
              {todo.title}
            </Text>
            <Text fontSize="text.small" color="text-secondary" mt="1">
              {formatDate(new Date(todo.createdAt))}
            </Text>
          </Box>
        </Box>

        {todo.description && (
          <Text fontSize="text.base" color="text-secondary" mb="6">
            {todo.description}
          </Text>
        )}

        <Separator mb="6" />

        <Box
          display="flex"
          flexDirection={{base: 'column', md: 'row'}}
          justifyContent="space-between"
          gap="3"
        >
          <Button variant="subtle" width={{base: '100%', md: 'auto'}} onClick={handleDelete}>
            <Box display="flex" alignItems="center" gap="2">
              <IconDelete width={16} height={16} />
              Delete
            </Box>
          </Button>
          {!todo.completed && (
            <Button
              variant="solid"
              width={{base: '100%', md: 'auto'}}
              onClick={() => router.push(`/todos/${todo.id}/edit`)}
            >
              <Box display="flex" alignItems="center" gap="2">
                <IconEdit width={16} height={16} />
                Edit
              </Box>
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
