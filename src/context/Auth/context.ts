import { useState, useEffect } from "react";
import AuthenticationService from "services/external/api/auth";
import SecureStorage from "react-native-secure-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthenticationResponse } from "services/external/api/models";

export enum SecureStorageKeys {
    BudgeterKey = "BudgeterAPIKey"
 }

export enum AuthState {
    SignedOut,
    SigningIn,
    SignedIn
 }

 export interface Context {
    authState: AuthState;
    signin?: (email: string, password: string) => Promise<AuthenticationResponse | undefined>;
    signup?: (email: string, password: string) => Promise<AuthenticationResponse | undefined>;
    signout?: () => void;
 }
 
 export const defaultValue: Context = {
    authState: AuthState.SignedOut,
    signin: undefined,
    signup: undefined,
    signout: undefined
 }

 export const useAuth = (): Context => {
   const [authState, setAuthState] = useState<AuthState>(AuthState.SigningIn);

   const signin = async (email: string, password: string): Promise<AuthenticationResponse | undefined> => {
      try {
         const authenticationService = AuthenticationService.getInstance();
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
         const authenticationService = AuthenticationService.getInstance();
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
   }, []);

   return {  authState, signin, signup, signout };
 }