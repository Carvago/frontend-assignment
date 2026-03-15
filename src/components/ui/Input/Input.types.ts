import {ChangeEvent} from 'react';

export interface BaseInputProps {
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  helperText?: string;
  error?: string;
  placeholder?: string;
  name?: string;
}
