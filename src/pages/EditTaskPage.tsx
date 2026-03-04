import {useNavigate, useParams} from 'react-router-dom';
import {Box, Center, Flex, Spinner, Text} from '@chakra-ui/react';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {Button} from '../components/ui/Button';
import {Card} from '../components/ui/Card';
import {PageLayout} from '../components/layout/PageLayout';
import {TodoForm} from '../features/todos/components/TodoForm';
import {
  useGetTodoById,
  useUpdateTodoById,
  getGetTodoListQueryKey,
  getGetTodoByIdQueryKey,
  type TodoResponse,
} from '../api/generated';
import {PATHS} from '../routes/paths';

export const EditTaskPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {id} = useParams<{id: string}>();
  const queryClient = useQueryClient();

  const {data, isLoading, isError} = useGetTodoById(id!);
  const todo = data as TodoResponse | undefined;

  const updateMutation = useUpdateTodoById({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: getGetTodoListQueryKey()});
        queryClient.invalidateQueries({queryKey: getGetTodoByIdQueryKey(id!)});
        navigate(PATHS.OVERVIEW);
      },
    },
  });

  if (isLoading) {
    return (
      <PageLayout showUserInfo>
        <Center py="100px">
          <Spinner size="xl" color="fill-brand" />
        </Center>
      </PageLayout>
    );
  }

  if (isError || !todo) {
    return (
      <PageLayout showUserInfo>
        <Card>
          <Center py={15}>
            <Text color="text-danger">{t('error.generic')}</Text>
          </Center>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout showUserInfo>
      <Card>
        <Box>
          <Flex align="center" gap={4} mb={2}>
            <Button
              variant="icon"
              icon="backwards"
              iconPosition="left"
              onClick={() => navigate(-1)}
            />
            <Text fontWeight="heading.1" fontSize="heading.2" color="text-primary">
              {todo.title}
            </Text>
          </Flex>
          {todo.description && (
            <Text fontSize="text.base" color="text-tertiary" pl={14}>
              {todo.description}
            </Text>
          )}
        </Box>

        <Box borderTop="1px solid" borderColor="border-gray" pt={6}>
          <TodoForm
            initialTitle={todo.title}
            initialDescription={todo.description ?? ''}
            submitLabel={t('task.edit.saveChanges')}
            discardLabel={t('task.edit.discardChanges')}
            onSubmit={(data) =>
              updateMutation.mutate({
                id: todo.id,
                data: {title: data.title, description: data.description || undefined},
              })
            }
            onDiscard={() => navigate(-1)}
            loading={updateMutation.isPending}
          />
        </Box>
      </Card>
    </PageLayout>
  );
};
