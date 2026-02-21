import {Box, Flex, Heading, HStack, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {Link, useNavigate} from '@tanstack/react-router';
import {
  Button,
  Card,
  DashboardHeader,
  EmptyStateBlock,
  TaskRow,
  VirtualTaskList,
} from '../components';
import {spacing, spacingScale} from '../design-system/spacing';
import {
  // taskKeys,
  useDeleteTaskMutation,
  useTaskListQuery,
  useToggleTaskMutation,
} from '../api/taskQueries';
// import { useQueryClient } from '@tanstack/react-query'
// import { seedTasks } from '../api/tasks'
// import { useState } from 'react'
import {useAuth} from '../context/AuthContext';
import {displayName, formatDashboardDate} from '../utils';
import type {Task} from '../types/task';

export function Dashboard() {
  const {t, i18n} = useTranslation();
  const navigate = useNavigate();
  const {user, isAuthenticated} = useAuth();
  const {data: tasks = [], isLoading: tasksLoading} = useTaskListQuery({
    enabled: isAuthenticated,
  });
  const toggleMutation = useToggleTaskMutation();
  const deleteMutation = useDeleteTaskMutation();

  // Testing large amount of tasks for performance testing
  // const queryClient = useQueryClient()
  // const [seeding, setSeeding] = useState(false)
  // const [seedError, setSeedError] = useState<string | null>(null)

  const handleToggle = (task: Task) =>
    toggleMutation.mutate({id: task.id, completed: !task.completed});
  const handleDelete = (task: Task) => deleteMutation.mutate(task.id);
  const handleEdit = (task: Task) =>
    navigate({to: '/tasks/$taskId/edit', params: {taskId: task.id}});

  // Testing large amount of tasks for performance testing
  // const handleSeed = async () => {
  //   setSeeding(true)
  //   setSeedError(null)
  //   try {
  //     await seedTasks(3000)
  //     await queryClient.invalidateQueries({ queryKey: taskKeys.list() })
  //   } catch (err) {
  //     const message = err instanceof Error ? err.message : 'Request failed'
  //     setSeedError(message.includes('404') ? 'Seed endpoint not found. Restart the backend server.' : message)
  //   } finally {
  //     setSeeding(false)
  //   }
  // }

  const name = user ? displayName(user.username) : '';
  const dateString = formatDashboardDate(new Date(), i18n.language);

  const todoTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);
  const hasTasks = tasks.length > 0;
  const allCompleted = hasTasks && todoTasks.length === 0;

  /** Use virtualization only for large lists to keep compact layout when few tasks. */
  const useVirtualList = (list: Task[]) => list.length > 30;
  const virtualizeTodo = useVirtualList(todoTasks);
  const virtualizeCompleted = useVirtualList(completedTasks);

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" backgroundColor="fill-gray">
      <DashboardHeader />

      <Box flex="1" paddingX={{base: spacingScale[2], sm: spacing.page}} paddingY={0}>
        <Card
          maxWidth="1280px"
          marginX="auto"
          padding={{base: spacingScale[4], sm: spacing.card}}
          display="flex"
          flexDirection="column"
        >
          <Flex
            justifyContent="space-between"
            alignItems="flex-start"
            flexWrap="wrap"
            gap={spacing.section}
            marginBottom={{base: spacingScale[4], sm: spacing.card}}
          >
            <Box>
              <Heading
                as="h1"
                color="text-primary"
                fontSize="heading.1"
                fontWeight="heading.1"
                lineHeight="32px"
                marginBottom={spacing.inline}
              >
                {t('dashboard.greeting', {name})}
              </Heading>
              <Text fontSize="text.base" color="text-tertiary">
                {dateString}
              </Text>
            </Box>
            <HStack gap={spacing.inline}>
              {/* Testing large amount of tasks for performance testing
              <Box>
                <Button
                  size="md"
                  variant="ghost"
                  onClick={handleSeed}
                  disabled={seeding}
                  title="Seed 3000 mock tasks for performance testing"
                >
                  <Text as="span">{seeding ? '…' : 'Seed 3k tasks'}</Text>
                </Button>
                {seedError && (
                  <Text fontSize="text.small" color="text-danger" marginTop={1}>
                    {seedError}
                  </Text>
                )}
              </Box> */}
              <Button size="md" asChild>
                <Link to="/tasks/new">
                  <HStack gap={spacing.inline}>
                    <Text as="span" color="text-white">
                      {t('dashboard.addTask')}
                    </Text>
                  </HStack>
                </Link>
              </Button>
            </HStack>
          </Flex>

          {tasksLoading ? (
            <Flex
              flex="1"
              alignItems="center"
              justifyContent="center"
              paddingY={spacing.pageVertical}
            >
              <Text color="text-secondary">{t('auth.loading')}</Text>
            </Flex>
          ) : hasTasks ? (
            <VStack align="stretch" gap={spacingScale[6]}>
              {allCompleted && <EmptyStateBlock />}
              {todoTasks.length > 0 && (
                <Box>
                  <Heading
                    as="h2"
                    color="text-primary"
                    fontSize="heading.2"
                    fontWeight="heading.2"
                    lineHeight="24px"
                    paddingBottom={spacing.inlineTight}
                    marginBottom={spacing.stack}
                    borderBottom="1px solid"
                    borderColor="fill-gray-hover"
                  >
                    {t('dashboard.todo')}
                  </Heading>
                  {virtualizeTodo ? (
                    <VirtualTaskList
                      tasks={todoTasks}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      height="min(400px, 50vh)"
                      gap={spacingScale[3]}
                    />
                  ) : (
                    <VStack align="stretch" gap={spacingScale[3]}>
                      {todoTasks.map((task) => (
                        <TaskRow
                          key={task.id}
                          task={task}
                          onToggle={() => handleToggle(task)}
                          onDelete={() => handleDelete(task)}
                          onEdit={() => handleEdit(task)}
                        />
                      ))}
                    </VStack>
                  )}
                </Box>
              )}
              {completedTasks.length > 0 && (
                <Box>
                  <Heading
                    size="xl"
                    color="text-primary"
                    fontWeight="heading.2"
                    paddingBottom={spacing.inline}
                    marginBottom={spacing.stack}
                    borderBottom="1px solid"
                    borderColor="fill-gray-hover"
                  >
                    {t('dashboard.completed')}
                  </Heading>
                  {virtualizeCompleted ? (
                    <VirtualTaskList
                      tasks={completedTasks}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                      height="min(400px, 50vh)"
                      gap={0}
                    />
                  ) : (
                    <VStack align="stretch" gap={0}>
                      {completedTasks.map((task) => (
                        <TaskRow
                          key={task.id}
                          task={task}
                          onToggle={() => handleToggle(task)}
                          onDelete={() => handleDelete(task)}
                          onEdit={() => handleEdit(task)}
                        />
                      ))}
                    </VStack>
                  )}
                </Box>
              )}
            </VStack>
          ) : (
            <EmptyStateBlock />
          )}
        </Card>
      </Box>
    </Box>
  );
}
