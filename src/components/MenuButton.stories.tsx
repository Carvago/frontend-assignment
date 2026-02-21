import type {Meta, StoryObj} from '@storybook/react';
import {MenuButton} from './MenuButton';

const meta: Meta<typeof MenuButton> = {
  title: 'Components/MenuButton',
  component: MenuButton,
  tags: ['autodocs'],
  argTypes: {
    disabled: {control: 'boolean'},
  },
};

export default meta;

type Story = StoryObj<typeof MenuButton>;

export const Default: Story = {
  args: {
    children: 'Menu item',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled item',
    disabled: true,
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <MenuButton {...args}>
      <span style={{marginRight: 8}}>⚙</span>
      Settings
    </MenuButton>
  ),
};
