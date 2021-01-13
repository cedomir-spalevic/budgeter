import React, { useState, createContext, useContext, useEffect } from "react";
import AuthenticationService from "services/external/api/auth";
import { deleteItem, getItem, setItem, StorageKeys } from "services/internal/storage";
import { AlreadyExistsError, EmailNotVerifiedError, NotFoundError, UnauthorizedError } from "services/external/api/models/errors";
import { Alert } from "react-native";
import { btoa } from "services/internal/security";
import * as LocalAuthentication from "expo-local-authentication";
import UserService from "services/external/api/me";

interface AuthResponse {
    valid: boolean;
    emailNotVerified?: boolean;
    emailError?: string;
    passwordError?: string;
}

export enum AuthState {
   SignedOut,
   Verified,
   SignedIn
}

interface Props {
   children: React.ReactNode;
}

interface Context {
    state: AuthState;
    tryLocalAuthentication: () => Promise<boolean>;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (firstName: string, lastName: string, email: string, password: string) => Promise<AuthResponse>;
    forgotPassword: (email: string) => Promise<boolean>;
    confirmEmailVerification: (code: number) => Promise<boolean>;
    confirmPasswordReset: (code: number) => Promise<boolean>;
    updatePassword: (password: string) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<Context>(undefined!);

const AuthProvider: React.FC<Props> = (props: Props) => {
    const [state, setState] = useState<AuthState>(AuthState.SignedOut);

    const verify = () => {
        const authenticationService = AuthenticationService.getInstance();
        authenticationService.verify().then(x => {
            if(x)
                setState(AuthState.Verified);
        })
    }

    const tryLocalAuthentication = async (): Promise<boolean> => {
        try {
            if(state !== AuthState.Verified)
                return;
            const response = await LocalAuthentication.authenticateAsync();
            if(response)
                setState(AuthState.SignedIn);
            return true;
        }
        catch {
            return false;
        }
    }

    const login = async (email: string, password: string): Promise<AuthResponse> => {
        try {
            const authenticationService = AuthenticationService.getInstance();
            const response = await authenticationService.login(email, btoa(password));
            setItem(StorageKeys.AccessToken, response.token);
            setState(AuthState.SignedIn);
            return { valid: true };
        }
        catch(error) {
            if(error instanceof UnauthorizedError) 
                return { valid: false, passwordError: "Incorrect password" }
            else if(error instanceof NotFoundError) 
                return { valid: false, emailError: "No user found with this email" }
            else if(error instanceof EmailNotVerifiedError) {
                const authenticationService = AuthenticationService.getInstance();
                const response = await authenticationService.challenge(email, "emailVerification");
                await setItem(StorageKeys.ConfirmationKey, response.key)
                return { valid: false, emailNotVerified: true };
            }
            else {
                Alert.alert("Unable to log in", "We're having trouble logging you in. Please try again later.")
                return { valid: false }
            }
        }
    }

    const register = async (firstName: string, lastName: string, email: string, password: string): Promise<AuthResponse> => {
        try {
            const authenticationService = AuthenticationService.getInstance();
            const response = await authenticationService.register(firstName, lastName, email, btoa(password));
            await setItem(StorageKeys.ConfirmationKey, response.key)
            return { valid: true };
        }
        catch(error) {
            if(error instanceof AlreadyExistsError)
                return { valid: false, emailError: "A user already exists with this email address" }
            else {
                Alert.alert("Unable to create account", "We're having trouble creating your account. Please try again later.");
                return { valid: false }
            }
        }
    }

    const forgotPassword = async (email: string): Promise<boolean> => {
        try {
            const authenticationService = AuthenticationService.getInstance();
            const response = await authenticationService.challenge(email, "passwordReset");
            await setItem(StorageKeys.ConfirmationKey, response.key);
            return true;
        }
        catch(error) {
            Alert.alert("Unable to confirm your email", "We're having trouble verifying your email. Please try again later.");
            return false;
        }
    }

    const confirmEmailVerification = async (code: number): Promise<boolean> => {
        try {
            const authenticationService = AuthenticationService.getInstance();
            const key = await getItem(StorageKeys.ConfirmationKey);
            const response = await authenticationService.confirmChallenge(key, code);
            await deleteItem(StorageKeys.ConfirmationKey);
            await setItem(StorageKeys.AccessToken, response.token);
            setState(AuthState.SignedIn);
            return true;
        }
        catch(error) {
            if(error instanceof UnauthorizedError) 
                return false;
            else {
                Alert.alert("Unable to confirm your email", "We're having trouble confirming your email. Please try again later.")
                return false;
            }
        }
    }
    const confirmPasswordReset = async (code: number): Promise<boolean> => {
        try {
            const authenticationService = AuthenticationService.getInstance();
            const key = await getItem(StorageKeys.ConfirmationKey);
            await authenticationService.confirmChallenge(key, code);
            return true;
        }
        catch(error) {
            if(error instanceof UnauthorizedError) 
                return false;
            else {
                Alert.alert("Unable to confirm your email", "We're having trouble confirming your email. Please try again later.")
                return false;
            }
        }
    }
    
    const updatePassword = async (password: string): Promise<boolean> => {
        try {
            const userService  = UserService.getInstance();
            await userService.updatePassword(btoa(password));
            return true;
        }
        catch(error) {
            if(error instanceof UnauthorizedError) 
                return false;
            else {
                Alert.alert("Unable to update password", "We're having trouble updating your password. Please try again later.")
                return false;
            }
        }
    }

    const logout = () => {
        deleteItem(StorageKeys.AccessToken);
        setState(AuthState.SignedOut);
    }

    useEffect(() => {
        verify();
    }, [])

    const value: Context = {
        state,
        tryLocalAuthentication,
        login,
        register,
        forgotPassword,
        confirmEmailVerification,
        confirmPasswordReset,
        updatePassword,
        logout
    }

   return (
      <AuthContext.Provider value={value}>
         {props.children}
      </AuthContext.Provider>
   )
};

export const useAuth = (): Context => useContext<Context>(AuthContext);

export default AuthProvider;