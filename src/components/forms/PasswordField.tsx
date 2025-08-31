import { FormField, FormFieldProps } from "./FormField";
import { useState } from "react";
import { HideIcon, ShowIcon } from "../icons";

export function PasswordField(props: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <FormField {...props} type={showPassword ? 'text' : 'password'} rightElement={
            <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={togglePasswordVisibility}
            >
                {showPassword ? <HideIcon width="16px" height="16px" /> : <ShowIcon width="16px" height="16px" />}
            </button>
        } />
    )
}