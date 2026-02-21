import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Checkbox} from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {control: 'boolean'},
    disabled: {control: 'boolean'},
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: {
    checked: false,
    'aria-label': 'Task item',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    'aria-label': 'Task item',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    'aria-label': 'Disabled task',
  },
};

function InteractiveCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox checked={checked} onChange={() => setChecked((c) => !c)} aria-label="Toggle task" />
  );
}

export const Interactive: Story = {
  render: () => <InteractiveCheckbox />,
};
