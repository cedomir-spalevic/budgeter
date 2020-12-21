import React, { useState, createContext, useContext, useEffect } from "react";
import AuthenticationService from "services/external/api/auth";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthenticationResponse } from "services/external/api/models";
import { deleteItem, setItem, StorageKeys } from "services/internal/storage";
import { NoUserFoundError, UnauthorizedError } from "services/external/api/models/errors";

export interface Response {
   emailError?: string;
   passwordError?: string;
   formError?: string;
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
   authState: AuthState;
   signin: (email: string, password: string) => Promise<Response | undefined>;
   signup: (email: string, password: string) => Promise<AuthenticationResponse | undefined>;
   signout: () => void;
   useLocalAuthentication: () => Promise<void>;
}

export const AuthContext = createContext<Context>(undefined!);

const AuthProvider: React.FC<Props> = (props: Props) => {
   const [authState, setAuthState] = useState<AuthState>(AuthState.SignedOut);

   const signin = async (email: string, password: string): Promise<Response | undefined> => {
      try {
         const authenticationService = AuthenticationService.getInstance();
         const response = await authenticationService.signin(email, password);
         setItem(StorageKeys.AccessToken, response.token);
         setItem(StorageKeys.UserEmail, email);
         setAuthState(AuthState.SignedIn);
         return undefined;
      }
      catch (error) {
         if(error instanceof UnauthorizedError) 
            return { passwordError: "Incorrect password" }
         else if(error instanceof NoUserFoundError) 
            return { emailError: "No user found with this email" }
         else {
            console.error("Error occurred during sign in");
            console.error(error);
            return { formError: error.message }
         }
      }
   }

   const signup = async (email: string, password: string): Promise<AuthenticationResponse | undefined> => {
      try {
         const authenticationService = AuthenticationService.getInstance();
         const response = await authenticationService.register(email, password);
         if (response.valid) {
            setItem(StorageKeys.AccessToken, response.token);
            setAuthState(AuthState.SignedIn);
         }
         return response;
      }
      catch (error) {
         return undefined;
      }
   }

   const signout = async () => {
      deleteItem(StorageKeys.UserEmail);
      deleteItem(StorageKeys.AccessToken);
      setAuthState(AuthState.SignedOut)
   }

   const verify = async () => {
      try {
         const authenticationService = AuthenticationService.getInstance();
         const valid = await authenticationService.verify();
         if(!valid)
            throw new Error();
         setAuthState(AuthState.Verified);
      }
      catch (error) {
         setAuthState(AuthState.SignedOut);
      }
   }

   const useLocalAuthentication = async () => {
      const response = await LocalAuthentication.authenticateAsync();
      if(response)
         setAuthState(AuthState.SignedIn);
   }

   useEffect(() => {
      verify();
   }, [])

   return (
      <AuthContext.Provider value={{ authState, signin, signout, signup, useLocalAuthentication }}>
         {props.children}
      </AuthContext.Provider>
   )
};

export const useAuth = (): Context => {
   const auth = useContext<Context>(AuthContext);
   return auth;
}

export default AuthProvider;