import {ReactNode} from 'react';

export type ButtonVariant = 'solid' | 'subtle' | 'ghost';

export interface ButtonProps {
  children?: ReactNode;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  width?: string | Record<string, string>;
}
