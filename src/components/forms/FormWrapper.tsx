import {Heading, Text} from '@chakra-ui/react';
import {PropsWithChildren} from 'react';
import {Card} from '../Card';

type Props = {
  title: string;
  description: string;
};

export function FormWrapper({title, description, children}: PropsWithChildren<Props>) {
  return (
    <Card sx={{maxW: '576px'}}>
      <Heading fontSize="heading.1" alignSelf="flex-start">
        {title}
      </Heading>
      <Text color="text-secondary">{description}</Text>
      {children}
    </Card>
  );
}
