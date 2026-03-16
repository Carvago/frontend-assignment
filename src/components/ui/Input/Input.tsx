import {Box, Input as ChakraInput, Text} from '@chakra-ui/react';
import {BaseInputProps} from './Input.types';
import {InputLabel} from './InputLabel';

export function Input({
  label,
  required,
  value,
  onChange,
  helperText,
  error,
  ...rest
}: BaseInputProps) {
  return (
    <Box display="flex" flexDirection="column" gap="4px" width="100%">
      {label && <InputLabel label={label} required={required} hasError={!!error} />}
      <ChakraInput
        type="text"
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        {...rest}
      />
      {(helperText || error) && (
        <Text fontSize="text.small" color={error ? 'text-danger' : 'text-tertiary'}>
          {error || helperText}
        </Text>
      )}
    </Box>
  );
}
