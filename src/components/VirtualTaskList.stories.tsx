import type {Meta, StoryObj} from '@storybook/react';
import {VirtualTaskList} from './VirtualTaskList';
import type {Task} from '../types/task';

function buildTasks(count: number): Task[] {
  return Array.from({length: count}, (_, i) => ({
    id: `task-${i + 1}`,
    title: `Task ${i + 1}`,
    description: i % 3 === 0 ? `Description for task ${i + 1}` : '',
    completed: i % 4 === 0,
    createdAt: new Date(Date.now() - i * 3600000).toISOString(),
  }));
}

const sampleTasks = buildTasks(50);

const meta: Meta<typeof VirtualTaskList> = {
  title: 'Components/VirtualTaskList',
  component: VirtualTaskList,
  tags: ['autodocs'],
  argTypes: {
    tasks: {control: false},
    height: {control: 'number'},
    gap: {control: 'number'},
  },
};

export default meta;

type Story = StoryObj<typeof VirtualTaskList>;

export const Default: Story = {
  args: {
    tasks: sampleTasks,
    onToggle: (task) => console.log('Toggle', task.id),
    onDelete: (task) => console.log('Delete', task.id),
    onEdit: (task) => console.log('Edit', task.id),
    height: 400,
  },
};

export const FewItems: Story = {
  args: {
    tasks: buildTasks(5),
    onToggle: () => {},
    onDelete: () => {},
    onEdit: () => {},
    height: 400,
  },
};

export const Empty: Story = {
  args: {
    tasks: [],
    onToggle: () => {},
    onDelete: () => {},
    onEdit: () => {},
    height: 400,
  },
};

export const TallViewport: Story = {
  args: {
    tasks: sampleTasks,
    onToggle: () => {},
    onDelete: () => {},
    onEdit: () => {},
    height: 600,
  },
};
