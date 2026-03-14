export interface BaseInputProps {
  label?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  helperText?: string;
  error?: string;
  placeholder?: string;
  name?: string;
}
