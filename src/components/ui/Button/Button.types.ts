import {ButtonProps as ChakraButtonProps} from '@chakra-ui/react';
import {ReactNode} from 'react';

export type ButtonVariant = 'solid' | 'subtle' | 'ghost';

export interface ButtonProps extends Omit<ChakraButtonProps, 'variant'> {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
