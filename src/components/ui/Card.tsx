import type {ReactNode} from 'react';
import {Card as ChakraCard} from '@chakra-ui/react';

export const Card = ({children}: {children: ReactNode}) => (
  <ChakraCard.Root
    bg="white"
    borderRadius="3xl"
    p={{base: 6, md: 10}}
    gap={{base: 6, md: 10}}
    boxShadow="none"
    border="none"
  >
    <ChakraCard.Body p={0} gap={{base: 6, md: 10}}>
      {children}
    </ChakraCard.Body>
  </ChakraCard.Root>
);
