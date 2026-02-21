import {Button as ChakraButton, type ButtonProps as ChakraButtonProps} from '@chakra-ui/react';
import {forwardRef} from 'react';

export interface MenuButtonProps extends Omit<ChakraButtonProps, 'variant' | 'size'> {
  /** Whether the menu item is disabled */
  disabled?: boolean;
}

export const MenuButton = forwardRef<HTMLButtonElement, MenuButtonProps>(
  ({disabled, children, ...props}, ref) => (
    <ChakraButton
      ref={ref}
      type="button"
      width="100%"
      justifyContent="flex-start"
      textAlign="left"
      paddingX={4}
      paddingY={2}
      height="auto"
      minHeight="40px"
      fontSize="text.small"
      fontWeight="text.base"
      color={disabled ? 'text-tertiary' : 'text-primary'}
      backgroundColor="transparent"
      border="none"
      borderRadius="4px"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.7 : 1}
      transition="background-color 0.2s ease"
      _hover={disabled ? undefined : {backgroundColor: 'fill-gray'}}
      _active={disabled ? undefined : {backgroundColor: 'fill-gray-hover'}}
      _disabled={{
        color: 'text-tertiary',
        opacity: 0.7,
        cursor: 'not-allowed',
      }}
      disabled={disabled}
      role="menuitem"
      {...props}
    >
      {children}
    </ChakraButton>
  )
);

MenuButton.displayName = 'MenuButton';
