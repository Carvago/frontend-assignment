import '@testing-library/jest-dom';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {ChakraProvider, defaultSystem} from '@chakra-ui/react';
import {TodoForm} from './TodoForm';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({t: (key: string) => key}),
}));

const defaultProps = {
  submitLabel: 'Create',
  discardLabel: 'Discard',
  onSubmit: jest.fn(),
  onDiscard: jest.fn(),
};

const renderTodoForm = (props: Partial<Parameters<typeof TodoForm>[0]> = {}) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <TodoForm {...defaultProps} {...props} />
    </ChakraProvider>
  );

describe('TodoForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and description fields', () => {
    renderTodoForm();
    expect(screen.getByText('task.field.title')).toBeInTheDocument();
    expect(screen.getByText('task.field.description')).toBeInTheDocument();
  });

  it('renders submit and discard buttons', () => {
    renderTodoForm();
    expect(screen.getByText('Create')).toBeInTheDocument();
    expect(screen.getByText('Discard')).toBeInTheDocument();
  });

  it('shows validation error when submitting empty title', async () => {
    renderTodoForm();
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => {
      expect(screen.getByText('validation.required')).toBeInTheDocument();
    });
    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with trimmed title and description', async () => {
    renderTodoForm();
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], {target: {value: '  My Task  '}});
    fireEvent.change(inputs[1], {target: {value: '  Some description  '}});
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledWith(
        {title: 'My Task', description: 'Some description'},
        expect.anything()
      );
    });
  });

  it('calls onDiscard when discard button is clicked', () => {
    renderTodoForm();
    fireEvent.click(screen.getByText('Discard'));
    expect(defaultProps.onDiscard).toHaveBeenCalled();
  });

  it('pre-fills fields with initial values', () => {
    renderTodoForm({initialTitle: 'Existing task', initialDescription: 'Details'});
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('Existing task');
    expect(inputs[1]).toHaveValue('Details');
  });
});
