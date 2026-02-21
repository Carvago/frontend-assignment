import {Box, type BoxProps} from '@chakra-ui/react';

export interface CardProps extends BoxProps {
  /** Card content */
  children: React.ReactNode;
}

const defaultCardStyles = {
  backgroundColor: 'fill-white',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
} as const;

export function Card({children, ...props}: CardProps) {
  return (
    <Box {...defaultCardStyles} {...props}>
      {children}
    </Box>
  );
}
