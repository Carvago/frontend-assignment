import type {Meta, StoryObj} from '@storybook/react';
import {Button} from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['brand', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {control: 'boolean'},
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Brand: Story = {
  args: {
    children: 'Add task',
    variant: 'brand',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Discard',
    variant: 'ghost',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    variant: 'brand',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large button',
    variant: 'brand',
    size: 'lg',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full width',
    variant: 'brand',
    fullWidth: true,
  },
};
