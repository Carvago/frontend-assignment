import {Box, Textarea as ChakraTextarea, Text} from '@chakra-ui/react';
import {BaseTextareaProps} from './Input.types';
import {InputLabel} from './InputLabel';

export function Textarea({
  label,
  required,
  value,
  onChange,
  helperText,
  error,
  ...rest
}: BaseTextareaProps) {
  return (
    <Box display="flex" flexDirection="column" gap="4px" width="100%">
      {label && <InputLabel label={label} required={required} hasError={!!error} />}
      <ChakraTextarea
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
