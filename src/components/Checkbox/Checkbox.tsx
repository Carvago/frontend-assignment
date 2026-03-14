import {Box} from '@chakra-ui/react';
import {checkboxChecked, checkboxUnchecked} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';

export function Checkbox({checked = false, onChange, disabled}: CheckboxProps) {
  return (
    <Box
      as="button"
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => !disabled && onChange?.(!checked)}
      opacity={disabled ? 0.4 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      {...(checked ? checkboxChecked : checkboxUnchecked)}
    >
      {checked && <img src="/icons/icon-check.svg" alt="checked" width={14} height={14} />}
    </Box>
  );
}
