import React, { useState, createContext, useContext, useEffect } from "react";
import AuthenticationService from "services/external/api/auth";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthenticationResponse } from "services/external/api/models";
import { deleteItem, setItem, StorageKeys } from "services/internal/storage";

export enum AuthState {
   SignedOut,
   SigningIn,
   SignedIn
}

interface Props {
   children: React.ReactNode;
}

interface Context {
   authState: AuthState;
   signin?: (email: string, password: string) => Promise<AuthenticationResponse | undefined>;
   signup?: (email: string, password: string) => Promise<AuthenticationResponse | undefined>;
   signout?: () => void;
}

const defaultValue: Context = {
   authState: AuthState.SignedOut,
   signin: undefined,
   signup: undefined,
   signout: undefined
}

export const AuthContext = createContext<Context>(defaultValue);

const AuthProvider: React.FC<Props> = (props: Props) => {
   const [authState, setAuthState] = useState<AuthState>(AuthState.SigningIn);

   const signin = async (email: string, password: string): Promise<AuthenticationResponse | undefined> => {
      try {
         const authenticationService = AuthenticationService.getInstance();
         const response = await authenticationService.signin(email, password);
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
      deleteItem(StorageKeys.AccessToken);
      setAuthState(AuthState.SignedOut)
   }

   const verify = async () => {
      try {
         const authenticationService = AuthenticationService.getInstance();
         const valid = await authenticationService.verify();
         if(!valid)
            throw new Error();
         const localAuthResponse = await LocalAuthentication.authenticateAsync();
         setAuthState(localAuthResponse.success ? AuthState.SignedIn : AuthState.SignedOut);
      }
      catch (error) {
         setAuthState(AuthState.SignedOut);
      }
   }

   useEffect(() => {
      verify();
   }, [])

   return (
      <AuthContext.Provider value={{ authState, signin, signout, signup }}>
         {props.children}
      </AuthContext.Provider>
   )
};

export const useAuth = (): Context => {
   const auth = useContext<Context>(AuthContext);
   return auth;
}

export default AuthProvider;