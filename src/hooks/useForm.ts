import {useState, type ChangeEvent} from 'react';

export function useForm<T extends Record<string, string>>(initialFields: T) {
  const [fields, setFields] = useState<T>(initialFields);
  const [errors, setErrors] = useState<Partial<T>>({});
  const [isLoading, setIsLoading] = useState(false);

  const setField = (key: keyof T) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(prev => ({...prev, [key]: e.target.value}));
    setErrors(prev => ({...prev, [key]: undefined}));
  };

  const reset = () => {
    setFields(initialFields);
    setErrors({});
  };

  return {fields, setFields, errors, setErrors, isLoading, setIsLoading, setField, reset};
}
