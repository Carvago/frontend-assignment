import {Heading, VStack, Text} from '@chakra-ui/react';
import {PropsWithChildren} from 'react';

type Props = {
  title: string;
  description: string;
};

export function FormWrapper({title, description, children}: PropsWithChildren<Props>) {
  return (
    <VStack
      p={{
        sm: '16px',
        lg: '40px',
      }}
      maxW="xl"
      minW="576px"
      bg="white"
      borderRadius={24}
      gap={6}
    >
      <Heading fontSize="heading.1" alignSelf="flex-start">
        {title}
      </Heading>
      <Text color="text-secondary">{description}</Text>
      {children}
    </VStack>
  );
}
