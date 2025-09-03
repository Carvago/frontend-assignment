import {VStack, Skeleton} from '@chakra-ui/react';

export function TodosSkeleton() {
  return (
    <VStack spacing="16px" w="full">
      {Array.from({length: 4}).map((_, index) => (
        <SingleTodoSkeleton key={index} />
      ))}
    </VStack>
  );
}

export function SingleTodoSkeleton() {
  return <Skeleton height="60px" w="full" borderRadius="md" />;
}
