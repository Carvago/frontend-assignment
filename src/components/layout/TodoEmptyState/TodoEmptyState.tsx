import {Box, Text} from '@chakra-ui/react';

export function TodoEmptyState() {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap="3" py="10">
      <img src="/logo.svg" alt="empty" width={80} />
      <Text fontSize="heading.3" fontWeight="heading.2" color="text-primary">
        You are amazing!
      </Text>
      <Text fontSize="text.base" color="text-secondary">
        There is no more task to do.
      </Text>
    </Box>
  );
}
