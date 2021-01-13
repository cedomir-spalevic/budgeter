import React, { useState, createContext, useContext, useEffect } from "react";
import AuthenticationService from "services/external/api/auth";
import { deleteItem, getItem, setItem, StorageKeys } from "services/internal/storage";
import { AlreadyExistsError, EmailNotVerifiedError, NotFoundError, UnauthorizedError } from "services/external/api/models/errors";
import { Alert } from "react-native";
import { btoa } from "services/internal/security";
import * as LocalAuthentication from "expo-local-authentication";
import { ChallengeType } from "services/external/api/models/data";

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
    forgotPassword: (email: string) => Promise<void>;
    confirmEmailVerification: (code: number) => Promise<void>;
    confirmPasswordReset: (code: number) => Promise<void>;
    updatePassword: (password: string) => Promise<void>;
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
                challenge(email, "emailVerification");
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

    const challenge = async (email: string, type: ChallengeType): Promise<AuthResponse> => {
        try {
            const authenticationService = AuthenticationService.getInstance();
            const response = await authenticationService.challenge(email, type);
            await setItem(StorageKeys.ConfirmationKey, response.key)
            return { valid: true };
        }
        catch(error) {
            if(error instanceof NotFoundError)
                return { valid: false }
            Alert.alert("Unable to verify your email", "We're having trouble verifying your email. Please try again later.");
            return { valid: false }
        }
    }

    const confirmChallenge = async (code: number): Promise<AuthResponse> => {
        try {
            const authenticationService = AuthenticationService.getInstance();
            const key = await getItem(StorageKeys.ConfirmationKey);
            const response = await authenticationService.confirmChallenge(key, code);
            await deleteItem(StorageKeys.ConfirmationKey);
            await setItem(StorageKeys.AccessToken, response.token);
            setState(AuthState.SignedIn);
            return { valid: true };
        }
        catch(error) {
            if(error instanceof UnauthorizedError) 
                return { valid: false }
            else {
                Alert.alert("Unable to confirm your email", "We're having trouble confirming your email. Please try again later.")
                return { valid: false }
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

   return (
      <AuthContext.Provider value={{ state, tryLocalAuthentication, login, logout, register, challenge, confirmChallenge }}>
         {props.children}
      </AuthContext.Provider>
   )
};

export const useAuth = (): Context => useContext<Context>(AuthContext);

export default AuthProvider;