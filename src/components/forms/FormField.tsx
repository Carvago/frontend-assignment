import { FormControl, FormLabel, Input, FormErrorMessage, InputProps, InputRightElement, InputGroup } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export type FormFieldProps = Omit<InputProps, 'name'> & {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
  isRequired?: boolean;
  rightElement?: ReactNode;
}

export const FormField = ({
  label,
  name,
  register,
  error,
  rightElement,
  isRequired = false,
  ...inputProps
}: FormFieldProps) => (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
            <InputGroup>
              <Input id={name} {...register} {...inputProps} />
              <InputRightElement>
                {rightElement}
              </InputRightElement>
            </InputGroup>
          <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
);
