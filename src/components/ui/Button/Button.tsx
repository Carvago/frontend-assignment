import {Button as ChakraButton} from '@chakra-ui/react';
import {ButtonProps} from './Button.types';

export function Button({
  children,
  variant = 'solid',
  leftIcon,
  rightIcon,
  type = 'button',
  width,
  ...rest
}: ButtonProps) {
  const isIconOnly = !children && (leftIcon || rightIcon);
  const icon = leftIcon || rightIcon;

  return (
    <ChakraButton
      type={type}
      variant={variant}
      px={isIconOnly ? '0' : '4'}
      minW={isIconOnly ? '40px' : undefined}
      w={isIconOnly ? '40px' : width}
      {...rest}
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
