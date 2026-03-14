import {Text} from '@chakra-ui/react';

interface InputLabelProps {
  label: string;
  required?: boolean;
  hasError?: boolean;
}

export function InputLabel({label, required, hasError}: InputLabelProps) {
  return (
    <Text fontSize="text.small" fontWeight="text.alternative" color={hasError ? 'text-danger' : 'text-secondary'}>
      {required && (
        <Text as="span" color="text-danger" mr="2px">
          *
        </Text>
      )}
      {label}
    </Text>
  );
}
