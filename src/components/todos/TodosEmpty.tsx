import {Box, VStack, Heading, Text} from '@chakra-ui/react';
import {BigLogo} from '../icons';

export const TodosEmpty = () => (
  <VStack spacing="24px" w="full">
    <Box position="relative">
      <BigLogo width="150px" height="130px" />
    </Box>

    <VStack spacing="12px">
      <Heading size="2" color="text-primary">
        You are amazing!
      </Heading>

      <Text color="text-secondary" fontSize="text.base">
        There is no more task to do.
      </Text>
    </VStack>
  </VStack>
);
