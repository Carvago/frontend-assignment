import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {ConfirmDialog} from './ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Components/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
  argTypes: {
    open: {control: 'boolean'},
    variant: {
      control: 'select',
      options: ['default', 'danger'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ConfirmDialog>;

function ConfirmDialogWrapper(args: React.ComponentProps<typeof ConfirmDialog>) {
  const [open, setOpen] = useState(args.open ?? false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <ConfirmDialog
        {...args}
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log('Confirmed');
        }}
      />
    </>
  );
}

export const Default: Story = {
  args: {
    open: true,
    title: 'Confirm action',
    description: 'Are you sure you want to proceed? This action can be undone later.',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    variant: 'default',
  },
  render: (args) => <ConfirmDialogWrapper {...args} />,
};

export const Danger: Story = {
  args: {
    open: true,
    title: 'Delete task?',
    description: 'This action cannot be undone.',
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    variant: 'danger',
  },
  render: (args) => <ConfirmDialogWrapper {...args} />,
};
