import {type InputProps as ChakraInputProps, type TextareaProps as ChakraTextareaProps} from '@chakra-ui/react';
import {ChangeEvent} from 'react';

type SharedProps = {
  label?: string;
  error?: string;
  helperText?: string;
};

export interface BaseInputProps extends Omit<ChakraInputProps, 'onChange'>, SharedProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface BaseTextareaProps extends Omit<ChakraTextareaProps, 'onChange'>, SharedProps {
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
