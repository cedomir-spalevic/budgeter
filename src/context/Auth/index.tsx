import React, { useState, createContext, useContext } from "react";
import AuthenticationService from "services/external/api/auth";
import { deleteItem, setItem, StorageKeys } from "services/internal/storage";
import { NotFoundError, UnauthorizedError } from "services/external/api/models/errors";
import { Alert } from "react-native";
import { btoa } from "services/internal/security";

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
    login: (email: string, password: string) => Promise<Response>;
    logout: () => void;
    register: (email: string, password: string) => Promise<Response>;
}

export const AuthContext = createContext<Context>(undefined!);

const AuthProvider: React.FC<Props> = (props: Props) => {
    const [state, setState] = useState<AuthState>(AuthState.SignedOut);

    const login = async (email: string, password: string): Promise<Response> => {
        try {
            const authenticationService = AuthenticationService.getInstance();
            const response = await authenticationService.login(email, btoa(password));
            setItem(StorageKeys.AccessToken, response.token);
            setItem(StorageKeys.UserEmail, email);
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
        deleteItem(StorageKeys.UserEmail);
        deleteItem(StorageKeys.AccessToken);
        setState(AuthState.SignedOut);
    }

//    const signin = async (email: string, password: string): Promise<Response | undefined> => {
//       try {
//          const authenticationService = AuthenticationService.getInstance();
//          const response = await authenticationService.signin(email, password);
//          setItem(StorageKeys.AccessToken, response.token);
//          setItem(StorageKeys.UserEmail, email);
//          setAuthState(AuthState.SignedIn);
//          return undefined;
//       }
//       catch (error) {
//          if(error instanceof UnauthorizedError) 
//             return { passwordError: "Incorrect password" }
//          else if(error instanceof NotFoundError) 
//             return { emailError: "No user found with this email" }
//          else {
//             console.error("Error occurred during sign in");
//             console.error(error);
//             return { formError: error.message }
//          }
//       }
//    }

//    const signup = async (email: string, password: string): Promise<Response | undefined> => {
//       try {
//          const authenticationService = AuthenticationService.getInstance();
//          const response = await authenticationService.register(email, password);
//          setItem(StorageKeys.AccessToken, response.token);
//          setItem(StorageKeys.UserEmail, email);
//          setAuthState(AuthState.SignedIn);
//          return undefined;
//       }
//       catch (error) {
//          if(error instanceof AlreadyExistsError) 
//             return { emailError: "A user already exists with this email" }
//          else {
//             console.error("Error occurred during sign in");
//             console.error(error);
//             return { formError: error.message }
//          }
//       }
//    }

//    const signout = async () => {
//       deleteItem(StorageKeys.UserEmail);
//       deleteItem(StorageKeys.AccessToken);
//       setAuthState(AuthState.SignedOut)
//    }

//    const verify = async () => {
//       try {
//          const authenticationService = AuthenticationService.getInstance();
//          const valid = await authenticationService.verify();
//          if(!valid)
//             throw new Error();
//          setAuthState(AuthState.Verified);
//       }
//       catch (error) {
//          setAuthState(AuthState.SignedOut);
//       }
//    }

//    const useLocalAuthentication = async () => {
//       const response = await LocalAuthentication.authenticateAsync();
//       if(response)
//          setAuthState(AuthState.SignedIn);
//    }

   return (
      <AuthContext.Provider value={{ state, login, logout, register }}>
         {props.children}
      </AuthContext.Provider>
   )
};

export const useAuth = (): Context => useContext<Context>(AuthContext);

export default AuthProvider;