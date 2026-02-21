import {Box, Flex, Heading, HStack, Input, Text, Textarea, VStack} from '@chakra-ui/react';
import {RiArrowLeftLine, RiCheckLine} from 'react-icons/ri';
import {MdDelete} from 'react-icons/md';
import {Link, useBlocker, useNavigate} from '@tanstack/react-router';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect, useMemo, useState} from 'react';
import {Button, Card, ConfirmDialog} from '../components';
import {spacing, spacingScale} from '../design-system/spacing';
import {createNewTaskSchema, type NewTaskFormValues} from '../schemas/task';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useTaskQuery,
  useUpdateTaskMutation,
} from '../api/taskQueries';
import {DashboardHeader} from '../components/DashboardHeader';

export interface TaskFormProps {
  taskId?: string;
}

export function TaskForm({taskId}: TaskFormProps) {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const isEdit = Boolean(taskId);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const createTaskMutation = useCreateTaskMutation();
  const updateTaskMutation = useUpdateTaskMutation();
  const deleteTaskMutation = useDeleteTaskMutation();
  const {data: task, isLoading: taskLoading, isError: taskError} = useTaskQuery(taskId);

  const schema = useMemo(() => createNewTaskSchema(t), [t]);

  const {
    control,
    handleSubmit,
    reset,
    formState: {isSubmitting, isDirty},
  } = useForm<NewTaskFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {title: '', description: ''},
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (task) {
      reset({title: task.title, description: task.description});
    }
  }, [task, reset]);

  const {
    proceed,
    reset: resetBlocker,
    status: blockerStatus,
  } = useBlocker({
    shouldBlockFn: () => isDirty,
    withResolver: true,
    enableBeforeUnload: isDirty,
  });

  useEffect(() => {
    if (isEdit && taskError) {
      navigate({to: '/', ignoreBlocker: true});
    }
  }, [isEdit, taskError, navigate]);

  const onSubmit = async (data: NewTaskFormValues) => {
    if (isEdit && taskId) {
      await updateTaskMutation.mutateAsync({
        id: taskId,
        updates: {title: data.title, description: data.description},
      });
    } else {
      await createTaskMutation.mutateAsync({
        title: data.title,
        description: data.description,
      });
    }
    navigate({to: '/', ignoreBlocker: true});
  };

  const onDiscard = () => {
    navigate({to: '/'});
  };

  const onDelete = () => {
    if (taskId) {
      deleteTaskMutation.mutate(taskId, {
        onSuccess: () => navigate({to: '/', ignoreBlocker: true}),
      });
    }
  };

  const isPending =
    createTaskMutation.isPending || updateTaskMutation.isPending || deleteTaskMutation.isPending;

  if (isEdit && taskLoading) {
    return (
      <Box minHeight="100vh" display="flex" flexDirection="column" backgroundColor="fill-gray">
        <DashboardHeader />
        <Flex flex="1" alignItems="center" justifyContent="center" padding={spacing.card}>
          <Text color="text-secondary">{t('auth.loading')}</Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" backgroundColor="fill-gray">
      <DashboardHeader />

      <Box flex="1" paddingX={{base: spacingScale[4], md: spacing.page}}>
        <Card
          maxWidth="1280px"
          marginX="auto"
          borderRadius="24px"
          padding={{base: spacingScale[4], sm: spacing.card}}
        >
          <HStack gap={spacing.stack} marginBottom={spacing.card} alignItems="flex-start">
            <Link to="/" aria-label="Go back" style={{display: 'flex'}}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="40px"
                height="40px"
                borderRadius="full"
                backgroundColor="fill-gray"
                color="text-primary"
                _hover={{backgroundColor: 'fill-gray-hover'}}
                transition="background-color 0.2s ease"
              >
                <RiArrowLeftLine size={17} />
              </Box>
            </Link>
            <Box flex="1" minWidth={0} alignSelf="center">
              <Heading
                as="h1"
                color="text-primary"
                fontSize="heading.1"
                fontWeight="heading.1"
                lineHeight="32px"
              >
                {isEdit && task ? task.title : t('task.newTask')}
              </Heading>
            </Box>
          </HStack>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <VStack gap={spacing.stack} align="stretch">
              <Box>
                <Text
                  fontSize="text.small"
                  color="text-secondary"
                  marginBottom={spacing.label}
                  fontWeight="text.base"
                >
                  <Box as="span" color="text-danger" aria-hidden="true">
                    *{' '}
                  </Box>
                  {t('task.taskName')}
                </Text>
                <Controller
                  name="title"
                  control={control}
                  render={({field, fieldState}) => {
                    const hasError = Boolean(fieldState.error);
                    return (
                      <>
                        <Input
                          {...field}
                          id="new-task-title"
                          type="text"
                          fontSize="text.base"
                          fontWeight="text.base"
                          paddingX={spacingScale[4]}
                          paddingY={spacing.inline}
                          placeholder={t('task.taskNamePlaceholder')}
                          autoComplete="off"
                          backgroundColor="fill-white"
                          borderColor={hasError ? 'border-danger' : 'border-gray'}
                          borderRadius="4px"
                          height="40px"
                          _focus={{
                            borderColor: hasError ? 'border-danger' : 'border-brand',
                            boxShadow: hasError
                              ? '0 0 0 1px var(--chakra-colors-border-danger)'
                              : '0 0 0 1px var(--chakra-colors-border-brand)',
                          }}
                        />
                        {fieldState.error?.message && (
                          <Text
                            color="text-danger"
                            fontSize="text.small"
                            marginTop={spacing.label}
                            role="alert"
                          >
                            {fieldState.error.message}
                          </Text>
                        )}
                      </>
                    );
                  }}
                />
              </Box>

              <Box>
                <Text
                  fontSize="text.small"
                  color="text-secondary"
                  fontWeight="text.base"
                  marginBottom={spacing.label}
                >
                  {t('task.descriptionOptional')}
                </Text>
                <Controller
                  name="description"
                  control={control}
                  render={({field, fieldState}) => {
                    const hasError = Boolean(fieldState.error);
                    return (
                      <>
                        <Textarea
                          {...field}
                          id="new-task-description"
                          fontSize="text.base"
                          fontWeight="text.base"
                          padding={spacingScale[4]}
                          placeholder={t('task.descriptionPlaceholder')}
                          backgroundColor="fill-white"
                          borderColor={hasError ? 'border-danger' : 'border-gray'}
                          borderRadius="4px"
                          minHeight="104px"
                          resize="vertical"
                          _focus={{
                            borderColor: hasError ? 'border-danger' : 'border-brand',
                            boxShadow: hasError
                              ? '0 0 0 1px var(--chakra-colors-border-danger)'
                              : '0 0 0 1px var(--chakra-colors-border-brand)',
                          }}
                        />
                        {fieldState.error?.message && (
                          <Text
                            color="text-danger"
                            fontSize="text.small"
                            marginTop={spacing.label}
                            role="alert"
                          >
                            {fieldState.error.message}
                          </Text>
                        )}
                      </>
                    );
                  }}
                />
              </Box>
            </VStack>
            <Flex
              marginTop={spacing.card}
              gap={3}
              flexDirection={{base: 'column', md: 'row'}}
              justifyContent={{md: 'space-between'}}
              alignItems={{base: 'stretch', md: 'center'}}
            >
              <Button
                type="button"
                variant="ghost"
                onClick={onDiscard}
                disabled={isSubmitting || isPending}
                _hover={{backgroundColor: 'fill-gray-hover'}}
                transition="background-color 0.2s ease"
                width={{base: '100%', md: 'auto'}}
              >
                {isEdit ? t('task.discardChanges') : t('task.discard')}
              </Button>
              <HStack
                gap={3}
                flexDirection={{base: 'column', md: 'row'}}
                width={{base: '100%', md: 'auto'}}
                alignItems="stretch"
              >
                {isEdit && (
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => setDeleteDialogOpen(true)}
                    disabled={isSubmitting || isPending}
                    width={{base: '100%', md: 'auto'}}
                  >
                    <HStack gap={spacing.inline} color="fill-gray">
                      <Text as="span" color="fill-gray">
                        {t('task.delete')}
                      </Text>
                      <MdDelete size={18} />
                    </HStack>
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={isSubmitting || isPending || (isEdit && !isDirty)}
                  width={{base: '100%', md: 'auto'}}
                >
                  <HStack gap={spacing.inline} color="text-white">
                    <Text as="span" color="text-white">
                      {isEdit ? t('task.saveChanges') : t('task.createTask')}
                    </Text>
                    <RiCheckLine size={20} />
                  </HStack>
                </Button>
              </HStack>
            </Flex>
          </form>
        </Card>
      </Box>
      {blockerStatus === 'blocked' && (
        <ConfirmDialog
          open
          onOpenChange={(open) => {
            if (!open) resetBlocker();
          }}
          title={t('task.leaveConfirmTitle')}
          description={t('task.leaveConfirmMessage')}
          confirmLabel={t('task.leave')}
          cancelLabel={t('dialog.cancel')}
          onConfirm={proceed}
        />
      )}
      {isEdit && (
        <ConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title={t('task.deleteConfirmTitle')}
          description={t('task.deleteConfirmMessage')}
          confirmLabel={t('task.delete')}
          cancelLabel={t('dialog.cancel')}
          variant="danger"
          onConfirm={onDelete}
        />
      )}
    </Box>
  );
}
