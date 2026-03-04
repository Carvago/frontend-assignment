import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {ChakraProvider, defaultSystem} from '@chakra-ui/react';
import {TextField} from './TextField';

const renderTextField = (props: Partial<Parameters<typeof TextField>[0]> = {}) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <TextField label="Username" value="" onChange={() => {}} {...props} />
    </ChakraProvider>
  );

describe('TextField', () => {
  it('renders with a label', () => {
    renderTextField({label: 'Email'});
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('shows required asterisk when required', () => {
    renderTextField({required: true});
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('does not show required asterisk by default', () => {
    renderTextField();
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    renderTextField({error: 'This field is required'});
    const errorMessages = screen.getAllByText('This field is required');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  it('calls onChange with input value', () => {
    const handleChange = jest.fn();
    renderTextField({onChange: handleChange});
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target: {value: 'hello'}});
    expect(handleChange).toHaveBeenCalledWith('hello');
  });

  it('renders with the correct input value', () => {
    renderTextField({value: 'test-value'});
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('test-value');
  });

  it('renders with placeholder text', () => {
    renderTextField({placeholder: 'Enter name...'});
    expect(screen.getByPlaceholderText('Enter name...')).toBeInTheDocument();
  });
});
