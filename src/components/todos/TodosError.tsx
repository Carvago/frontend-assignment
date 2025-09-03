import {VStack, Heading, Text} from '@chakra-ui/react';

type Props = {
  error?: Error | string;
};

export const TodosError = ({error}: Props) => {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error?.message || 'Something went wrong while loading your todos.';

  return (
    <>
      <VStack spacing="12px">
        <Heading size="2" color="text-danger">
          Oops! Something went wrong
        </Heading>

        <Text color="text-secondary" textAlign="center">
          {errorMessage}
        </Text>
      </VStack>
    </>
  );
};
