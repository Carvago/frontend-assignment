import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TaskForm} from './TaskForm';
import theme from '../theme';
import {ChakraProvider} from '@chakra-ui/react';

const mockNavigate = jest.fn();
const mockProceed = jest.fn();
const mockResetBlocker = jest.fn();
const mockMutateAsyncCreate = jest.fn().mockResolvedValue(undefined);
const mockMutateAsyncUpdate = jest.fn().mockResolvedValue(undefined);
const mockMutateDelete = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key, i18n: {language: 'en'}}),
}));

jest.mock('@tanstack/react-router', () => ({
  Link: ({children, to, ...props}: {children: React.ReactNode; to: string}) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
  useNavigate: () => mockNavigate,
  useBlocker: () => ({
    proceed: mockProceed,
    reset: mockResetBlocker,
    status: 'idle',
  }),
}));

jest.mock('../components/DashboardHeader', () => ({
  DashboardHeader: () => <div data-testid="dashboard-header" />,
}));

const editTaskData = {
  id: 'task-1',
  title: 'Existing task',
  description: 'Existing description',
  completed: false,
  createdAt: '2024-01-01T00:00:00Z',
};

jest.mock('../api/taskQueries', () => ({
  useCreateTaskMutation: () => ({
    mutateAsync: mockMutateAsyncCreate,
    isPending: false,
  }),
  useUpdateTaskMutation: () => ({
    mutateAsync: mockMutateAsyncUpdate,
    isPending: false,
  }),
  useDeleteTaskMutation: () => ({
    mutate: mockMutateDelete,
    isPending: false,
  }),
  useTaskQuery: (taskId: string | undefined) => ({
    data: taskId ? editTaskData : undefined,
    isLoading: false,
    isError: false,
  }),
}));

function renderTaskForm(props: {taskId?: string} = {}) {
  const result = render(
    <ChakraProvider value={theme}>
      <TaskForm {...props} />
    </ChakraProvider>
  );
  return {...result, getByPlaceholder: result.getByPlaceholderText};
}

describe('TaskForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('new task (create)', () => {
    it('renders create task form with Create task button', () => {
      renderTaskForm();
      expect(screen.getByRole('button', {name: /task\.createTask/i})).toBeInTheDocument();
    });

    it('submit button is enabled when form has no changes (create mode)', () => {
      renderTaskForm();
      const submitBtn = screen.getByRole('button', {name: /task\.createTask/i});
      expect(submitBtn).not.toBeDisabled();
    });

    it('submit is disabled while form is submitting', async () => {
      mockMutateAsyncCreate.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve(undefined), 100))
      );
      const {getByPlaceholder} = renderTaskForm();
      const submitBtn = screen.getByRole('button', {name: /task\.createTask/i});
      await userEvent.type(getByPlaceholder('task.taskNamePlaceholder'), 'New task');
      await userEvent.click(submitBtn);
      expect(submitBtn).toBeDisabled();
      mockMutateAsyncCreate.mockResolvedValue(undefined);
    });
  });

  describe('edit task (isDirty)', () => {
    it('renders edit form with Save changes button', () => {
      renderTaskForm({taskId: 'task-1'});
      expect(screen.getByRole('button', {name: /task\.saveChanges/i})).toBeInTheDocument();
    });

    it('Save changes button is disabled when form is not dirty', () => {
      renderTaskForm({taskId: 'task-1'});
      const submitBtn = screen.getByRole('button', {name: /task\.saveChanges/i});
      expect(submitBtn).toBeDisabled();
    });

    it('Save changes button becomes enabled when user changes title (form becomes dirty)', async () => {
      const {getByPlaceholder} = renderTaskForm({taskId: 'task-1'});
      const titleInput = getByPlaceholder('task.taskNamePlaceholder');
      const submitBtn = screen.getByRole('button', {name: /task\.saveChanges/i});

      expect(submitBtn).toBeDisabled();
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, 'Updated title');

      await waitFor(() => {
        expect(submitBtn).not.toBeDisabled();
      });
    });

    it('Save changes button becomes enabled when user changes description (form becomes dirty)', async () => {
      const {getByPlaceholder} = renderTaskForm({taskId: 'task-1'});
      const descInput = getByPlaceholder('task.descriptionPlaceholder');
      const submitBtn = screen.getByRole('button', {name: /task\.saveChanges/i});

      expect(submitBtn).toBeDisabled();
      await userEvent.type(descInput, 'New description');

      await waitFor(() => {
        expect(submitBtn).not.toBeDisabled();
      });
    });

    it('submits with updated values when Save changes is clicked', async () => {
      const {getByPlaceholder} = renderTaskForm({taskId: 'task-1'});
      const titleInput = getByPlaceholder('task.taskNamePlaceholder');
      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, 'New title');
      await userEvent.click(screen.getByRole('button', {name: /task\.saveChanges/i}));

      await waitFor(() => {
        expect(mockMutateAsyncUpdate).toHaveBeenCalledWith({
          id: 'task-1',
          updates: {title: 'New title', description: 'Existing description'},
        });
      });
      expect(mockNavigate).toHaveBeenCalledWith({to: '/', ignoreBlocker: true});
    });
  });
});
