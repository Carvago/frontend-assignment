import {Field, Input, Text} from '@chakra-ui/react';

type TextFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

export const TextField = ({
  label,
  required,
  error,
  placeholder,
  value,
  onChange,
  type = 'text',
}: TextFieldProps) => (
  <Field.Root invalid={!!error}>
    <Field.Label fontSize="text.small" color="text-secondary">
      {required && (
        <Text as="span" color="text-danger">
          *
        </Text>
      )}
      {label}
    </Field.Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      bg="white"
      border="1px solid"
      borderColor="border-gray"
      borderRadius="sm"
      px={4}
      py={3}
      h={12}
      fontSize="text.base"
      color="text-primary"
      _focus={{borderColor: 'border-brand', outline: 'none'}}
      _placeholder={{color: 'text-tertiary'}}
    />
    {error && <Field.ErrorText fontSize="text.small">{error}</Field.ErrorText>}
  </Field.Root>
);
