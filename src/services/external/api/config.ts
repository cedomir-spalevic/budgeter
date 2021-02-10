import EnvironmentService, { Environment } from "services/internal/environment";
import { getItem, setItem, StorageKeys } from "services/internal/storage";
import { AuthResponse, ConfirmationCodeResponse } from "./models/responses";
import AuthenticationService from "./auth";

class ApiConfig {
   static instance: ApiConfig;
   private baseUrl: string;

   constructor() {
      this.baseUrl = this.getBaseUrl();
   }

   static getInstance(): ApiConfig {
      if(!ApiConfig.instance)
         ApiConfig.instance = new ApiConfig();
      return ApiConfig.instance;
   }

   public getBaseUrl(): string {
      const environmentService = EnvironmentService.getInstance();
      switch(environmentService.environment) {
         case Environment.Local:
            return "http://localhost:4000/dev/";
         case Environment.Dev:
            return "https://g5quz7hgte.execute-api.us-east-1.amazonaws.com/dev/";
         case Environment.Prod:
            return "";
      }
   }

   public async handleAuthResponse(authResponse: AuthResponse): Promise<void> {
      const expiration = Date.now() + authResponse.expires;
      await setItem(StorageKeys.AccessToken, authResponse.accessToken);
      await setItem(StorageKeys.AccessTokenExpiration, expiration.toString());
      await setItem(StorageKeys.RefreshToken, authResponse.refreshToken);
   }

   public async handleConfirmationCodeResponse(confirmationCodeResponse: ConfirmationCodeResponse): Promise<void> {
      const expiration = Date.now() + confirmationCodeResponse.expires;
      await setItem(StorageKeys.ConfirmationKey, confirmationCodeResponse.key);
      await setItem(StorageKeys.ConfirmationKeyExpiration, expiration.toString());
   }

   public callApi(endpoint: string, init?: RequestInit): Promise<Response> {
      const url = `${this.baseUrl}${endpoint}`;
      return fetch(url, init);
   }

   public async checkForValidAccessToken(): Promise<void> {
      const accessTokenExpiration = await getItem(StorageKeys.AccessTokenExpiration) as string;
      if(Date.now()-500 > Number(accessTokenExpiration)) {
         const authenticationService = AuthenticationService.getInstance();
         await authenticationService.refresh();
      }
   }

   public async callApiProtected(endpoint: string, init?: RequestInit): Promise<Response> {
      await this.checkForValidAccessToken();
      const url = `${this.baseUrl}${endpoint}`;
      const token = await getItem(StorageKeys.AccessToken);
      const options = {
         ...init,
         headers: {
             ...(init && init.headers),
             "Authorization": `Bearer ${token}`
         }
     };
     return fetch(url, options);
   }
}

export default {
   getInstance: () => ApiConfig.getInstance()
}