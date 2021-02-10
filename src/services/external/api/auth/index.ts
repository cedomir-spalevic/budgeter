import { SegmentedControlIOSComponent } from "react-native";
import { getItem, StorageKeys } from "services/internal/storage";
import ApiConfig from "../config";
import { ChallengeType } from "../models/data/challenge";
import { 
   AlreadyExistsError,
   GeneralError, 
   InternalServerError, 
   NotFoundError, 
   UnauthorizedError 
} from "../models/errors";
import { AuthResponse, ConfirmationCodeResponse } from "../models/responses";

interface LoginResponse {
   isEmailVerified: boolean;
   confirmationCodeResponse?: ConfirmationCodeResponse;
   authResponse?: AuthResponse;
}

class AuthenticationService {
   private resource: string;
   static instance: AuthenticationService;

   constructor() {
      this.resource = "auth";
   }

   static getInstance(): AuthenticationService {
      if(!AuthenticationService.instance)
         AuthenticationService.instance = new AuthenticationService();
      return AuthenticationService.instance;
   }

   
   public async login(email: string, password: string): Promise<LoginResponse> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password })
      };
      const response = await apiConfig.callApi(`${this.resource}/login`, options);
      if(response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if(response.status === 401) {
         throw new UnauthorizedError();
      }
      if(response.status === 404) {
         throw new NotFoundError();
      }
      if(response.status >= 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      let authResponse = undefined;
      let confirmationCodeResponse = undefined;
      let isEmailVerified = true;
      if(response.status === 202) {
         isEmailVerified = false;
         confirmationCodeResponse = {
            key: body.key,
            expires: body.expires
         }
         await apiConfig.handleConfirmationCodeResponse(confirmationCodeResponse)
      }
      else {
         authResponse = {
            expires: body.expires,
            accessToken: body.accessToken,
            refreshToken: body.refreshToken
         }
         await apiConfig.handleAuthResponse(authResponse);
      }
      return {
         isEmailVerified,
         authResponse,
         confirmationCodeResponse
      }
   }

   public async refresh(): Promise<AuthResponse> {
      const refreshToken = await getItem(StorageKeys.RefreshToken);
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         body: JSON.stringify({ refreshToken })
      };
      const response = await apiConfig.callApi(`${this.resource}/refresh`, options);
      if(response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if(response.status === 401) {
         throw new UnauthorizedError();
      }
      if(response.status >= 500) {
         const body = await response.json();
         console.log(body)
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      const authResponse: AuthResponse = {
         expires: body.expires,
         accessToken: body.accessToken,
         refreshToken: body.refreshToken
      }
      await apiConfig.handleAuthResponse(authResponse);
      return authResponse;
   }

   public async register(firstName: string, lastName: string, email: string, password: string): Promise<ConfirmationCodeResponse> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ firstName, lastName, email, password })
      };
      const response = await apiConfig.callApi(`${this.resource}/register`, options);
      if(response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if(response.status === 409) {
         throw new AlreadyExistsError();
      }
      if(response.status >= 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      const confirmationCodeResponse: ConfirmationCodeResponse = {
         key: body.key,
         expires: body.expires
      }
      await apiConfig.handleConfirmationCodeResponse(confirmationCodeResponse);
      return confirmationCodeResponse;
   }

   public async challenge(email: string, type: ChallengeType): Promise<ConfirmationCodeResponse> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, type })
      };
      const response = await apiConfig.callApi(`${this.resource}/challenge`, options);
      if(response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if(response.status >= 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      const confirmationCodeResponse: ConfirmationCodeResponse = {
         key: body.key,
         expires: body.expires
      }
      await apiConfig.handleConfirmationCodeResponse(confirmationCodeResponse);
      return confirmationCodeResponse;
   }

   public async confirmChallenge(code: number): Promise<AuthResponse> {
      const key = await getItem(StorageKeys.ConfirmationKey);
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ code })
      };
      const response = await apiConfig.callApi(`${this.resource}/challenge/${key}`, options);
      if(response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if(response.status === 401) {
         throw new UnauthorizedError();
      }
      if(response.status >= 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      const authResponse: AuthResponse = {
         expires: body.expires,
         accessToken: body.accessToken,
         refreshToken: body.refreshToken
      }
      await apiConfig.handleAuthResponse(authResponse);
      return authResponse;
   }
}

export default {
   getInstance: () => AuthenticationService.getInstance()
}