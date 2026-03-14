import {Box, Textarea as ChakraTextarea, Text} from '@chakra-ui/react';
import {BaseInputProps} from './Input.types';
import {InputLabel} from './InputLabel';

export function Textarea({
  label,
  required,
  value,
  onChange,
  helperText,
  error,
  placeholder,
  name,
}: BaseInputProps) {
  return (
    <Box display="flex" flexDirection="column" gap="4px" width="100%">
      {label && <InputLabel label={label} required={required} hasError={!!error} />}
      <ChakraTextarea
        name={name}
        value={value}
        onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
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
