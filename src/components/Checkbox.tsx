import {Box} from '@chakra-ui/react';
import {RiCheckLine} from 'react-icons/ri';

export interface CheckboxProps {
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Change handler */
  onChange?: () => void;
  /** Accessible label (required for a11y when used standalone) */
  'aria-label': string;
  /** Disabled state */
  disabled?: boolean;
}

export function Checkbox({
  checked,
  onChange,
  'aria-label': ariaLabel,
  disabled = false,
}: CheckboxProps) {
  return (
    <Box
      as="button"
      width="32px"
      height="32px"
      borderRadius="full"
      borderWidth="2px"
      borderColor={checked ? 'fill-brand' : 'border-gray'}
      backgroundColor={checked ? 'fill-brand' : 'fill-white'}
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      onClick={disabled ? undefined : onChange}
      role="checkbox"
      aria-checked={checked}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      flexShrink={0}
      transition="border-color 0.2s ease, background-color 0.2s ease"
      _hover={
        disabled
          ? undefined
          : {
              borderColor: checked ? 'fill-brand-hover' : 'border-gray',
              backgroundColor: checked ? 'fill-brand-hover' : 'fill-gray',
            }
      }
    >
      {checked ? (
        <Box color="text-white" lineHeight={0}>
          <RiCheckLine size={22} />
        </Box>
      ) : null}
    </Box>
  );
}
