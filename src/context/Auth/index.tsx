import React, { useState, createContext, useContext, useEffect } from "react";
import AuthenticationService from "services/external/api/auth";
import { deleteItem, setItem, StorageKeys } from "services/internal/storage";
import { NotFoundError, UnauthorizedError } from "services/external/api/models/errors";
import { Alert } from "react-native";
import { btoa } from "services/internal/security";
import * as LocalAuthentication from "expo-local-authentication";

interface Response {
    valid: boolean;
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
    login: (email: string, password: string) => Promise<Response>;
    logout: () => void;
    register: (email: string, password: string) => Promise<Response>;
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

    const login = async (email: string, password: string): Promise<Response> => {
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
            else {
                Alert.alert("Unable to log in", "We're having trouble logging you in. Please try again later.")
                return { valid: false }
            }
        }
    }

    const register = async (email: string, password: string): Promise<Response> => {
        return {valid: true}
    }

    const logout = () => {
        deleteItem(StorageKeys.AccessToken);
        setState(AuthState.SignedOut);
    }

    useEffect(() => {
        verify();
    }, [])

   return (
      <AuthContext.Provider value={{ state, tryLocalAuthentication, login, logout, register }}>
         {props.children}
      </AuthContext.Provider>
   )
};

export const useAuth = (): Context => useContext<Context>(AuthContext);

export default AuthProvider;