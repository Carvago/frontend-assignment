import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputProps,
  InputRightElement,
  InputGroup,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import {ReactNode} from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

type BaseProps = {
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
  isRequired?: boolean;
  rightElement?: ReactNode;
};

export type InputFieldProps = BaseProps &
  Omit<InputProps, 'name'> & {
    multiLine?: false;
  };

type TextareaFieldProps = BaseProps &
  Omit<TextareaProps, 'name'> & {
    multiLine: true;
  };

export type FormFieldProps = InputFieldProps | TextareaFieldProps;

export const FormField = ({
  label,
  name,
  register,
  error,
  rightElement,
  multiLine = false,
  isRequired = false,
  ...inputProps
}: FormFieldProps) => (
  <FormControl isInvalid={!!error} isRequired={isRequired}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <InputGroup>
      {multiLine ? (
        <Textarea id={name} {...register} {...(inputProps as TextareaProps)} />
      ) : (
        <Input id={name} {...register} {...(inputProps as InputProps)} />
      )}
      <InputRightElement>{rightElement}</InputRightElement>
    </InputGroup>
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);
