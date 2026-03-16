import {Box} from '@chakra-ui/react';

import {KeyboardEvent} from 'react';
import IconCheck from '@icons/icon-check.svg';
import {checkboxChecked, checkboxUnchecked} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';

export function Checkbox({checked = false, onChange, disabled, label}: CheckboxProps) {
  return (
    <Box
      as="span"
      role="checkbox"
      tabIndex={disabled ? -1 : 0}
      aria-checked={checked}
      aria-disabled={disabled}
      aria-label={label ?? 'Toggle complete'}
      onClick={() => !disabled && onChange?.()}
      onKeyDown={(e: KeyboardEvent) => {
        if (!disabled && e.key === 'Enter') {
          e.preventDefault();
          onChange?.();
        }
      }}
      opacity={disabled ? 0.4 : 1}
      pointerEvents={disabled ? 'none' : 'auto'}
      {...(checked ? checkboxChecked : checkboxUnchecked)}
    >
      {checked && <IconCheck width={16} height={16} color="white" />}
    </Box>
  );
}
