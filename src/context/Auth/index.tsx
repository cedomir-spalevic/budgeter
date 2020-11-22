import React, { useState, createContext, useEffect } from "react";
import AuthenticationService, { AuthenticationResponse } from "services/api/auth";
import SecureStorage from "react-native-secure-storage";
import * as LocalAuthentication from "expo-local-authentication";

export enum SecureStorageKeys {
   BudgeterKey = "BudgeterAPIKey"
}

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

const storageConfig = {
   accessControl: "",
   accessible: "",
   authenticationPrompt: "",
   service: "",
   authenticateType: ""
}

const AuthContainer: React.FC<Props> = (props: Props) => {
   const [authState, setAuthState] = useState<AuthState>(AuthState.SigningIn);

   const signin = async (email: string, password: string): Promise<AuthenticationResponse | undefined> => {
      try {
         const authenticationService = new AuthenticationService();
         const response = await authenticationService.signin(email, password);
         if (response.valid) {
            await SecureStorage.setItem(SecureStorageKeys.BudgeterKey, response.token);
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
         const authenticationService = new AuthenticationService();
         const response = await authenticationService.register(email, password);
         if (response.valid) {
            await SecureStorage.setItem(SecureStorageKeys.BudgeterKey, response.token);
            setAuthState(AuthState.SignedIn);
         }
         return response;
      }
      catch (error) {
         return undefined;
      }
   }

   const signout = async () => {
      await SecureStorage.setItem(SecureStorageKeys.BudgeterKey, "");
      setAuthState(AuthState.SignedOut)
   }

   const verify = async () => {
      try {
         const token = await SecureStorage.getItem(SecureStorageKeys.BudgeterKey);
         const authenticationService = new AuthenticationService();
         const valid = await authenticationService.verify(token);
         if(!valid)
            throw new Error();
         const localAuthResponse = await LocalAuthentication.authenticateAsync();
         setAuthState(localAuthResponse.success ? AuthState.SignedIn : AuthState.SignedOut);
      }
      catch (error) {
         console.log(error);
         setAuthState(AuthState.SignedOut);
      }
   }

   useEffect(() => {
      verify();
   }, []);

   return (
      <AuthContext.Provider value={{ authState, signin, signup, signout }}>
         {props.children}
      </AuthContext.Provider>
   )
};

export default AuthContainer;