import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';
import {
  createTask,
  deleteTask as deleteTaskApi,
  fetchTask,
  fetchTaskList,
  setTaskCompleted,
  updateTask as updateTaskApi,
  type CreateTaskPayload,
} from './tasks';

export const taskKeys = {
  all: ['tasks'] as const,
  list: () => [...taskKeys.all, 'list'] as const,
  detail: (id: string) => [...taskKeys.all, 'detail', id] as const,
};

export function useTaskListQuery(
  options?: {enabled?: boolean} & Omit<
    UseQueryOptions<Awaited<ReturnType<typeof fetchTaskList>>>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: taskKeys.list(),
    queryFn: fetchTaskList,
    ...options,
  });
}

export function useTaskQuery(
  id: string | undefined,
  options?: {enabled?: boolean} & Omit<
    UseQueryOptions<Awaited<ReturnType<typeof fetchTask>>>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: taskKeys.detail(id!),
    queryFn: () => fetchTask(id!),
    enabled: Boolean(id),
    ...options,
  });
}

export function useCreateTaskMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof createTask>>,
    Error,
    CreateTaskPayload,
    unknown
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    ...options,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({queryKey: taskKeys.list()});
      options?.onSuccess?.(data, variables, context, mutation);
    },
  });
}

export function useUpdateTaskMutation(
  options?: UseMutationOptions<
    void,
    Error,
    {id: string; updates: {title?: string; description?: string}},
    unknown
  >
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, updates}) => updateTaskApi(id, updates),
    ...options,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({queryKey: taskKeys.list()});
      options?.onSuccess?.(data, variables, context, mutation);
    },
  });
}

export function useDeleteTaskMutation(options?: UseMutationOptions<void, Error, string, unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTaskApi,
    ...options,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({queryKey: taskKeys.list()});
      options?.onSuccess?.(data, variables, context, mutation);
    },
  });
}

export function useToggleTaskMutation(
  options?: UseMutationOptions<void, Error, {id: string; completed: boolean}, unknown>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, completed}) => setTaskCompleted(id, completed),
    ...options,
    onSuccess: (data, variables, context, mutation) => {
      queryClient.invalidateQueries({queryKey: taskKeys.list()});
      options?.onSuccess?.(data, variables, context, mutation);
    },
  });
}
