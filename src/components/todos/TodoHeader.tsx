import {Heading, HStack, VStack, Text, Button} from '@chakra-ui/react';
import {formatCzechDate} from '../../utils/dateFormatter';
import {Link} from 'react-router';

export function TodoHeader() {
  return (
    <HStack justify="space-between" w="full" mb="8px">
      <VStack align="flex-start">
        <Heading fontSize="heading.1">Hello, John Doe</Heading>
        <Text fontSize="text.base" color="text-secondary">
          {formatCzechDate(new Date())}
        </Text>
      </VStack>
      <Button as={Link} to="/todos/create" colorScheme="blue">
        Add task +
      </Button>
    </HStack>
  );
}
