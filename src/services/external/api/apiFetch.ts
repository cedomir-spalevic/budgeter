import { getItem, setItem, StorageKeys } from "services/internal/storage";
import { API_URL } from "react-native-dotenv";
import { AuthResponse, ConfirmationCodeResponse } from "../../models/responses";
import {
   GeneralError,
   InternalServerError,
   UnauthorizedError
} from "../../models/errors";
import { isAccessTokenValid } from "../utils";

export const handleAuthResponse = async (
   authResponse: AuthResponse
): Promise<void> => {
   const expiration = Date.now() + authResponse.expires;
   setItem(StorageKeys.AccessToken, authResponse.accessToken);
   setItem(StorageKeys.AccessTokenExpiration, expiration.toString());
   setItem(StorageKeys.RefreshToken, authResponse.refreshToken);
};

export const handleConfirmationCodeResponse = async (
   confirmationCodeResponse: ConfirmationCodeResponse
): Promise<void> => {
   const expiration = Date.now() + confirmationCodeResponse.expires;
   setItem(StorageKeys.ConfirmationKey, confirmationCodeResponse.key);
   setItem(StorageKeys.ConfirmationKeyExpiration, expiration.toString());
};

export const callApi = async (
   endpoint: string,
   init?: RequestInit
): Promise<Response> => {
   const url = `${API_URL}${endpoint}`;
   return fetch(url, init);
};

export const refresh = async (retries?: number): Promise<AuthResponse> => {
   const refreshToken = await getItem(StorageKeys.RefreshToken);
   const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ refreshToken })
   };
   const response = await callApi("auth/refresh", options);
   if (response.status === 400) {
      const body = await response.json();
      throw new GeneralError(body.message);
   }
   if (response.status === 401) {
      throw new UnauthorizedError();
   }
   if (response.status > 400) {
      if (retries !== 3) return refresh(retries ? retries + 1 : 1);
      const body = await response.json();
      throw new InternalServerError(body.message);
   }
   const body = await response.json();
   const authResponse: AuthResponse = {
      expires: body.expires,
      accessToken: body.accessToken,
      refreshToken: body.refreshToken
   };
   await handleAuthResponse(authResponse);
   return authResponse;
};

export const callApiProtected = async (
   endpoint: string,
   init?: RequestInit
): Promise<Response> => {
   await isAccessTokenValid();
   const url = `${API_URL}${endpoint}`;
   const token = await getItem(StorageKeys.AccessToken);
   const options = {
      ...init,
      headers: {
         ...(init && init.headers),
         Authorization: `Bearer ${token}`
      }
   };
   return fetch(url, options);
};
