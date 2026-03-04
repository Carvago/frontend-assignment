import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import {ChakraProvider, defaultSystem} from '@chakra-ui/react';
import {Checkbox} from './Checkbox';

const renderCheckbox = (props: Partial<Parameters<typeof Checkbox>[0]> = {}) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <Checkbox checked={false} onChange={() => {}} {...props} />
    </ChakraProvider>
  );

describe('Checkbox', () => {
  it('renders as a checkbox', () => {
    renderCheckbox();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('calls onChange with toggled value when clicked', () => {
    const handleChange = jest.fn();
    renderCheckbox({checked: false, onChange: handleChange});
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when unchecking', () => {
    const handleChange = jest.fn();
    renderCheckbox({checked: true, onChange: handleChange});
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('shows check icon when checked', () => {
    const {container} = renderCheckbox({checked: true});
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('does not show check icon when unchecked', () => {
    const {container} = renderCheckbox({checked: false});
    const svg = container.querySelector('svg');
    expect(svg).not.toBeInTheDocument();
  });
});
