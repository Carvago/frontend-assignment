import {StackProps, Card as ChakraCard} from '@chakra-ui/react';
import {PropsWithChildren} from 'react';

export function Card({children, ...props}: PropsWithChildren<StackProps>) {
  return (
    <ChakraCard
      bg="white"
      padding={{
        base: '16px',
        md: '40px',
      }}
      sx={{
        borderRadius: 24,
        gap: 6,
        flex: 1,
        maxW: '1280px',
        ...props.sx,
      }}
    >
      {children}
    </ChakraCard>
  );
}
