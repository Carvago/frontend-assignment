import type {Meta, StoryObj} from '@storybook/react';
import {TaskRow} from './TaskRow';
import type {Task} from '../types/task';

const sampleTask: Task = {
  id: '1',
  title: 'Review pull request',
  description: 'Check the new feature branch and leave feedback.',
  completed: false,
  createdAt: '2025-02-20T10:00:00Z',
};

const meta: Meta<typeof TaskRow> = {
  title: 'Components/TaskRow',
  component: TaskRow,
  tags: ['autodocs'],
  argTypes: {
    task: {control: false},
  },
};

export default meta;

type Story = StoryObj<typeof TaskRow>;

export const Default: Story = {
  args: {
    task: sampleTask,
    onToggle: () => {},
    onDelete: () => {},
    onEdit: () => {},
  },
};

export const Completed: Story = {
  args: {
    task: {...sampleTask, completed: true},
    onToggle: () => {},
    onDelete: () => {},
    onEdit: () => {},
  },
};

export const LongTitle: Story = {
  args: {
    task: {
      ...sampleTask,
      title: 'This is a task with a very long title that might wrap or truncate in the list view',
    },
    onToggle: () => {},
    onDelete: () => {},
    onEdit: () => {},
  },
};

export const WithLongDescription: Story = {
  args: {
    task: {
      ...sampleTask,
      description:
        'This task has a longer description that should be clamped to two lines in the UI. The rest of the text will be hidden with an ellipsis when the line clamp is applied.',
    },
    onToggle: () => {},
    onDelete: () => {},
    onEdit: () => {},
  },
};
