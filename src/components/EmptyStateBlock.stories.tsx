import type {Meta, StoryObj} from '@storybook/react';
import {EmptyStateBlock} from './EmptyStateBlock';

const meta: Meta<typeof EmptyStateBlock> = {
  title: 'Components/EmptyStateBlock',
  component: EmptyStateBlock,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EmptyStateBlock>;

export const Default: Story = {};
