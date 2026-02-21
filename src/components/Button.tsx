import {Button as ChakraButton, type ButtonProps as ChakraButtonProps} from '@chakra-ui/react';
import React, {forwardRef, type ComponentType} from 'react';

export interface ButtonProps extends Omit<ChakraButtonProps, 'variant'> {
  /** Render as the child component (e.g. Link) with button styles */
  asChild?: boolean;
  /** Full-width button (e.g. submit in forms) */
  fullWidth?: boolean;
  /** Visual style */
  variant?: 'brand' | 'ghost' | 'danger';
  /** Size */
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  brand: {
    backgroundColor: 'fill-brand',
    color: 'text-white',
    transition: 'background-color 0.2s ease',
    _hover: {backgroundColor: 'fill-brand-hover'},
  },
  ghost: {
    backgroundColor: 'fill-gray',
    color: 'text-primary',
    transition: 'background-color 0.2s ease',
    _hover: {backgroundColor: 'fill-white-hover'},
  },
  danger: {
    backgroundColor: 'fill-danger',
    color: 'text-white',
    transition: 'background-color 0.2s ease',
    _hover: {backgroundColor: 'fill-danger-hover'},
  },
} as const;

const sizeStyles = {
  sm: {height: '32px', padding: '0 12px', fontSize: 'text.small', fontWeight: 'text.alternative'},
  md: {height: '40px', padding: '0 20px', fontSize: 'text.small', fontWeight: 'text.alternative'},
  lg: {height: '48px', padding: '0 24px', fontSize: 'text.base', fontWeight: 'text.alternative'},
} as const;

const buttonStyles = (
  variant: 'brand' | 'ghost' | 'danger',
  size: 'sm' | 'md' | 'lg',
  fullWidth?: boolean
) => ({
  width: fullWidth ? '100%' : undefined,
  borderRadius: '100px',
  bg: 'unset',
  ...variantStyles[variant],
  ...sizeStyles[size],
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({asChild, fullWidth, variant = 'brand', size = 'md', children, ...props}, ref) => {
    const styles = buttonStyles(variant, size, fullWidth);

    if (asChild && React.Children.count(children) === 1 && React.isValidElement(children)) {
      const child = React.Children.only(children) as React.ReactElement<Record<string, unknown>>;
      const ChildComponent = child.type as ComponentType<Record<string, unknown>>;
      return (
        <ChakraButton
          ref={ref}
          as={ChildComponent}
          {...(child.props as Record<string, unknown>)}
          {...styles}
          {...props}
        >
          {(child.props as {children?: React.ReactNode}).children}
        </ChakraButton>
      );
    }

    return (
      <ChakraButton ref={ref} {...styles} {...props}>
        {children}
      </ChakraButton>
    );
  }
);

Button.displayName = 'Button';
