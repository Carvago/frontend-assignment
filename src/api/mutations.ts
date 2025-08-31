import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { api, AuthTokens } from "./client";
import { setTokens } from "../utils/tokenHelpers";
import { useAuthStore } from "../store/useAuthStore";

export const useLoginMutation = () => {
    const { login } = useAuthStore(s => s.actions);
    const toast = useToast();

    return useMutation({
        mutationFn: api.login,
        onSuccess: (tokens: AuthTokens) => {
            setTokens(tokens.accessToken, tokens.refreshToken);
            login();
            toast({
                title: "Login successful",
                description: "Welcome back!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Login failed. Please try again.';

            toast({
                title: "Login failed",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        },
    });
}

export const useRegisterMutation = () => {
    const { login } = useAuthStore(s => s.actions);
    const toast = useToast();

    return useMutation({
        mutationFn: api.register,
        onSuccess: (tokens: AuthTokens) => {
            setTokens(tokens.accessToken, tokens.refreshToken);
            login();
            toast({
                title: "Registration successful",
                description: "Welcome! Your account has been created.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                error?.message ||
                'Registration failed. Please try again.';

            toast({
                title: "Registration failed",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        },
    });
}
