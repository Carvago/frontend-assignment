export type Todo = {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  completed: boolean;
  userId: string;
};

export type CurrentUser = {
  id: string;
  username: string;
  createdAt: string;
};
