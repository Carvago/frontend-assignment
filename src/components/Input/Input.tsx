import {Box, Input as ChakraInput, Text} from '@chakra-ui/react';
import {BaseInputProps} from './Input.types';
import {InputLabel} from './InputLabel';

export function Input({label, required, value, onChange, helperText, error, placeholder, name}: BaseInputProps) {
  return (
    <Box display="flex" flexDirection="column" gap="4px" width="100%">
      {label && <InputLabel label={label} required={required} hasError={!!error} />}
      <ChakraInput
        name={name}
        type="text"
        value={value}
        onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {(helperText || error) && (
        <Text fontSize="text.small" color={error ? 'text-danger' : 'text-tertiary'}>
          {error || helperText}
        </Text>
      )}
    </Box>
  );
}
