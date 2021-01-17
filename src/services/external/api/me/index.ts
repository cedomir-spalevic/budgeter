import ApiConfig from "../config";
import { Platform } from "react-native";
import { GeneralError, InternalServerError, UnauthorizedError } from "../models/errors";
import { User } from "../models/data/user";
import { AuthResponse } from "../models/responses";
import { getItem, StorageKeys } from "services/internal/storage";

class UserService {
   private resource: string;
   static instance: UserService;

   constructor() {
      this.resource = "me";
   }

   static getInstance(): UserService {
      if(!UserService.instance)
        UserService.instance = new UserService();
      return UserService.instance;
   }

   public async get(): Promise<User> {
      const apiConfig = ApiConfig.getInstance();
      const response = await apiConfig.callApiProtected(`${this.resource}`);
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
      const body = await response.json()
      return {
         firstName: body.firstName,
         lastName: body.lastName,
         email: body.email,
         emailVerified: body.emailVerified,
         createdOn: new Date(body.createdOn),
         modifiedOn: new Date(body.modified),
         device: {
            os: body.device.os
         }
      }
   }

   public async updatePassword(password: string): Promise<AuthResponse> {
      const key = await getItem(StorageKeys.ConfirmationKey);
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ password })
      }
      const response = await apiConfig.callApi(`${this.resource}/resetPassword/${key}`, options);
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

   public async registerDevice(deviceToken: string): Promise<void> {
        const apiConfig = ApiConfig.getInstance();
        const body = {
            device: Platform.OS,
            token: deviceToken
        }
        const options: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        const response = await apiConfig.callApiProtected(`${this.resource}/registerDevice`, options);
        if (response.status !== 200)
            throw "Unable to register device";
   }
}

export default {
   getInstance: () => UserService.getInstance()
}