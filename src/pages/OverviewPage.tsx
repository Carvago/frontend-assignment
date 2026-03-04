import {useNavigate} from 'react-router-dom';
import {Box, Center, Flex, Spinner, Text} from '@chakra-ui/react';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {Button} from '../components/ui/Button';
import {Card} from '../components/ui/Card';
import {EmptyState} from '../components/ui/EmptyState';
import {PageLayout} from '../components/layout/PageLayout';
import {TodoSections} from '../features/todos/components/TodoSections';
import {
  useGetTodoList,
  useDeleteTodoById,
  useMarkTodoComplete,
  useMarkTodoIncomplete,
  getGetTodoListQueryKey,
  type GetTodoList200,
  type TodoResponse,
} from '../api/generated';
import {useAuth} from '../providers/AuthProvider';
import {toaster} from '../components/ui/Toaster';
import {PATHS} from '../routes/paths';
import {formatDate} from '../utils/formatDate';

type OptimisticContext = {previous: GetTodoList200 | undefined};

const TODO_LIST_KEY = getGetTodoListQueryKey();

export const OverviewPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {user} = useAuth();
  const queryClient = useQueryClient();

  const {data, isLoading, isError, refetch} = useGetTodoList();
  const todos = (data as GetTodoList200)?.todos ?? [];

  const optimisticUpdate = (transform: (todos: TodoResponse[], id: string) => TodoResponse[]) => ({
    onMutate: async ({id}: {id: string}) => {
      await queryClient.cancelQueries({queryKey: TODO_LIST_KEY});
      const previous = queryClient.getQueryData<GetTodoList200>(TODO_LIST_KEY);
      queryClient.setQueryData<GetTodoList200 | undefined>(TODO_LIST_KEY, (old) =>
        old ? {...old, todos: transform(old.todos, id)} : old
      );
      return {previous} as OptimisticContext;
    },
    onError: (_err: unknown, _vars: unknown, context: OptimisticContext | undefined) => {
      if (context?.previous) {
        queryClient.setQueryData(TODO_LIST_KEY, context.previous);
      }
      toaster.create({title: t('error.generic'), type: 'error'});
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: TODO_LIST_KEY});
    },
  });

  const deleteMutation = useDeleteTodoById({
    mutation: optimisticUpdate((todosArr, id) => todosArr.filter((todo) => todo.id !== id)),
  });

  const completeMutation = useMarkTodoComplete({
    mutation: optimisticUpdate((todosArr, id) =>
      todosArr.map((todo) => (todo.id === id ? {...todo, completed: true} : todo))
    ),
  });

  const incompleteMutation = useMarkTodoIncomplete({
    mutation: optimisticUpdate((todosArr, id) =>
      todosArr.map((todo) => (todo.id === id ? {...todo, completed: false} : todo))
    ),
  });

  const handleToggle = (id: string, completed: boolean) => {
    if (completed) {
      completeMutation.mutate({id});
    } else {
      incompleteMutation.mutate({id});
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate({id});
  };

  return (
    <PageLayout showUserInfo>
      <Card>
        <Flex
          justify="space-between"
          align={{base: 'flex-start', md: 'center'}}
          direction={{base: 'column', md: 'row'}}
          gap={4}
        >
          <Box>
            <Text fontWeight="heading.1" fontSize="heading.2" color="text-primary">
              {t('overview.greeting', {name: user?.username})}
            </Text>
            <Text fontSize="text.base" color="text-tertiary" mt={2}>
              {formatDate(new Date())}
            </Text>
          </Box>
          <Button type="button" icon="add" fullWidth onClick={() => navigate(PATHS.NEW_TASK)}>
            {t('overview.addTask')}
          </Button>
        </Flex>

        {isLoading && (
          <Center py={15}>
            <Spinner size="xl" color="fill-brand" />
          </Center>
        )}

        {isError && (
          <Center py={15} flexDirection="column" gap={4}>
            <Text color="text-danger">{t('error.generic')}</Text>
            <Button type="button" onClick={() => refetch()}>
              {t('error.retry')}
            </Button>
          </Center>
        )}

        {!isLoading && !isError && todos.filter((todo) => !todo.completed).length === 0 && (
          <EmptyState />
        )}

        {!isLoading && !isError && todos.length > 0 && (
          <TodoSections todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </Card>
    </PageLayout>
  );
};
