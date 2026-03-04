import {useNavigate} from 'react-router-dom';
import {Flex, Text} from '@chakra-ui/react';
import {useQueryClient} from '@tanstack/react-query';
import {useTranslation} from 'react-i18next';
import {Button} from '../components/ui/Button';
import {Card} from '../components/ui/Card';
import {PageLayout} from '../components/layout/PageLayout';
import {TodoForm} from '../features/todos/components/TodoForm';
import {useCreateTodo, getGetTodoListQueryKey} from '../api/generated';
import {PATHS} from '../routes/paths';

export const NewTaskPage = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createMutation = useCreateTodo({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: getGetTodoListQueryKey()});
        navigate(PATHS.OVERVIEW);
      },
    },
  });

  return (
    <PageLayout showUserInfo>
      <Card>
        <Flex align="center" gap={4}>
          <Button
            variant="icon"
            icon="backwards"
            iconPosition="left"
            onClick={() => navigate(-1)}
          />
          <Text fontWeight="heading.1" fontSize="heading.2" color="text-primary">
            {t('task.new.heading')}
          </Text>
        </Flex>

        <TodoForm
          submitLabel={t('task.new.create')}
          discardLabel={t('task.new.discard')}
          onSubmit={(data) =>
            createMutation.mutate({
              data: {title: data.title, description: data.description || undefined},
            })
          }
          onDiscard={() => navigate(-1)}
          loading={createMutation.isPending}
        />
      </Card>
    </PageLayout>
  );
};
