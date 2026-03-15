import {Button as ChakraButton} from '@chakra-ui/react';
import {ButtonProps} from './Button.types';

export function Button({
  children,
  variant = 'solid',
  leftIcon,
  rightIcon,
  onClick,
  disabled,
  type = 'button',
  width,
}: ButtonProps) {
  const isIconOnly = !children && (leftIcon || rightIcon);
  const icon = leftIcon || rightIcon;

  return (
    <ChakraButton
      type={type}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      px={isIconOnly ? '0' : '4'}
      minW={isIconOnly ? '40px' : undefined}
      w={isIconOnly ? '40px' : width}
    >
      {isIconOnly ? icon : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </ChakraButton>
  );
}
