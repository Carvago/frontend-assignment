import type {Meta, StoryObj} from '@storybook/react';
import {Box, Text} from '@chakra-ui/react';
import {PopupMenu} from './PopupMenu';
import {MenuButton} from './MenuButton';

const meta: Meta<typeof PopupMenu> = {
  title: 'Components/PopupMenu',
  component: PopupMenu,
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom-end', 'bottom-start', 'top-end', 'top-start'],
    },
    trigger: {control: false, table: {disable: true}},
    children: {control: false, table: {disable: true}},
    onClose: {control: false, table: {disable: true}},
  },
};

export default meta;

type Story = StoryObj<typeof PopupMenu>;

function TriggerButton() {
  return (
    <Box
      as="button"
      type="button"
      paddingX={3}
      paddingY={2}
      borderRadius="md"
      backgroundColor="fill-gray"
      _hover={{backgroundColor: 'fill-gray-hover'}}
    >
      <Text fontSize="text.small" color="text-primary">
        Open menu
      </Text>
    </Box>
  );
}

export const Default: Story = {
  args: {
    placement: 'bottom-end',
  },
  render: (args) => (
    <PopupMenu {...args} trigger={<TriggerButton />}>
      <>
        <MenuButton onClick={() => {}}>Settings</MenuButton>
        <MenuButton onClick={() => {}}>Log out</MenuButton>
      </>
    </PopupMenu>
  ),
};

export const WithCloseCallback: Story = {
  args: {
    placement: 'bottom-start',
  },
  render: (args) => (
    <PopupMenu {...args} trigger={<TriggerButton />} onClose={() => console.log('Menu closed')}>
      {(close) => (
        <>
          <MenuButton onClick={() => close()}>Item 1</MenuButton>
          <MenuButton onClick={() => close()}>Item 2</MenuButton>
        </>
      )}
    </PopupMenu>
  ),
};
