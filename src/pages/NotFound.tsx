import { Heading, Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <VStack spacing={6} pt="100px">
      <VStack spacing={3} alignItems="center" justifyContent="center" maxW="md">
        <Heading size="2xl">404</Heading>
        <Heading size="lg">Page Not Found</Heading>
        <Text textAlign="center">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </Text>
      </VStack>
      <Button colorScheme="blue" size="lg" onClick={() => navigate('/')}>
        Go Home
      </Button>
    </VStack>
  );
}
