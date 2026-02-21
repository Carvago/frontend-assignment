import type {Meta, StoryObj} from '@storybook/react';
import {Box, Text} from '@chakra-ui/react';
import {Card} from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    padding: {control: 'text'},
    borderRadius: {control: 'text'},
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <Box padding={6}>
        <Text color="text-primary" fontWeight="heading.2">
          Card content
        </Text>
        <Text color="text-secondary" fontSize="text.small" marginTop={2}>
          Reusable surface with shadow and border radius.
        </Text>
      </Box>
    </Card>
  ),
};

export const WithCustomPadding: Story = {
  args: {padding: 8},
  render: (args) => (
    <Card {...args}>
      <Text color="text-primary">Card with extra padding</Text>
    </Card>
  ),
};

export const Rounded: Story = {
  args: {borderRadius: '24px', padding: 6},
  render: (args) => (
    <Card {...args}>
      <Text color="text-primary">More rounded card (e.g. task form)</Text>
    </Card>
  ),
};
