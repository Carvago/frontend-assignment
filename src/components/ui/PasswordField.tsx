import {useState} from 'react';
import {Field, IconButton, Input, InputGroup, Text} from '@chakra-ui/react';
import {Icon} from './Icon';

type PasswordFieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
};

export const PasswordField = ({label, required, error, value, onChange}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <Field.Root invalid={!!error}>
      <Field.Label fontSize="text.small" color="text-secondary">
        {required && (
          <Text as="span" color="text-danger">
            *
          </Text>
        )}
        {label}
      </Field.Label>
      <InputGroup
        endElement={
          <IconButton
            variant="ghost"
            size="sm"
            onClick={() => setVisible(!visible)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            me="2"
            aspectRatio="square"
            height="calc(100% - {spacing.2})"
            color="text-primary"
          >
            <Icon name={visible ? 'hide' : 'show'} />
          </IconButton>
        }
      >
        <Input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
        />
      </InputGroup>
      {error && <Field.ErrorText fontSize="text.small">{error}</Field.ErrorText>}
    </Field.Root>
  );
};
