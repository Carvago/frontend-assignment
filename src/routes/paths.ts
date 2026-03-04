export const PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
  OVERVIEW: '/',
  NEW_TASK: '/tasks/new',
  EDIT_TASK: '/tasks/:id/edit',
} as const;

export const editTaskPath = (id: string) => `/tasks/${id}/edit`;
