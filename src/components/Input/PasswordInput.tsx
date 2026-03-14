import {Box, Input as ChakraInput, Text} from '@chakra-ui/react';
import {useState} from 'react';
import {passwordToggleStyle} from './Input.styles';
import {BaseInputProps} from './Input.types';
import {InputLabel} from './InputLabel';

export function PasswordInput({label, required, value, onChange, helperText, error, placeholder, name}: BaseInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box display="flex" flexDirection="column" gap="4px" width="100%">
      {label && <InputLabel label={label} required={required} hasError={!!error} />}
      <Box position="relative" width="100%">
        <ChakraInput
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          placeholder={placeholder}
          aria-invalid={!!error}
          pr="44px"
        />
        <button type="button" onClick={() => setShowPassword(p => !p)} style={passwordToggleStyle}>
          <img src={showPassword ? '/icons/icon-show.svg' : '/icons/icon-hide.svg'} alt="toggle password" width={16} height={16} />
        </button>
      </Box>
      {(helperText || error) && (
        <Text fontSize="text.small" color={error ? 'text-danger' : 'text-tertiary'}>
          {error || helperText}
        </Text>
      )}
    </Box>
  );
}
