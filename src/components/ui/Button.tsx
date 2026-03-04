import type {ReactNode, ButtonHTMLAttributes} from 'react';
import {Button as ChakraButton, type SystemStyleObject} from '@chakra-ui/react';
import {Icon, type IconName} from './Icon';

type ButtonVariant = 'primary' | 'ghost' | 'icon' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
};

const variantStyles: Record<ButtonVariant, SystemStyleObject> = {
  primary: {
    bg: 'fill-brand',
    color: 'text-white',
    px: 5,
    h: 10,
    _hover: {bg: 'fill-brand-hover'},
  },
  ghost: {
    bg: 'fill-gray',
    color: 'text-secondary',
    px: 5,
    h: 10,
    _hover: {color: 'text-primary'},
  },
  icon: {
    bg: 'fill-gray',
    color: 'text-primary',
    w: 10,
    h: 10,
    p: 0,
    minW: 10,
    _hover: {bg: 'fill-gray-hover'},
  },
  danger: {
    bg: 'transparent',
    color: 'text-danger',
    px: 3,
    py: 2,
    h: 'auto',
    _hover: {bg: 'fill-gray'},
  },
};

export const Button = ({
  variant = 'primary',
  icon,
  iconPosition = 'right',
  loading,
  fullWidth,
  children,
  ...props
}: ButtonProps) => (
  <ChakraButton
    variant="plain"
    loading={loading}
    w={fullWidth ? {base: '100%', md: 'auto'} : undefined}
    borderRadius="full"
    fontWeight="heading.3"
    fontSize="text.small"
    cursor="pointer"
    transition="all 0.2s"
    css={variantStyles[variant]}
    {...props}
  >
    {icon && iconPosition === 'left' && <Icon name={icon} size={16} />}
    {children}
    {icon && iconPosition === 'right' && <Icon name={icon} size={16} />}
  </ChakraButton>
);
