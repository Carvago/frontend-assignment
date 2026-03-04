import {Field, Text, Textarea} from '@chakra-ui/react';

type TextAreaProps = {
  label: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
};

export const TextArea = ({label, required, error, placeholder, value, onChange}: TextAreaProps) => (
  <Field.Root invalid={!!error} required={required}>
    <Field.Label fontSize="text.small" color="text-secondary">
      {required && (
        <Text as="span" color="text-danger">
          *
        </Text>
      )}
      {label}
    </Field.Label>
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      bg="white"
      border="1px solid"
      borderColor="border-gray"
      borderRadius="sm"
      px={4}
      py={3}
      fontSize="text.base"
      color="text-primary"
      minH="100px"
      resize="vertical"
      _focus={{borderColor: 'border-brand', outline: 'none'}}
      _placeholder={{color: 'text-tertiary'}}
    />
    {error && <Field.ErrorText fontSize="text.small">{error}</Field.ErrorText>}
  </Field.Root>
);
