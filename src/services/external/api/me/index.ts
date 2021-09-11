import { Platform } from "react-native";
import { getItem, StorageKeys } from "services/internal/storage";
import { callApiProtected, callApi, handleAuthResponse } from "../apiFetch";
import {
   GeneralError,
   InternalServerError,
   UnauthorizedError
} from "../../../models/errors";
import { UpdateUserBody, User } from "../../../models/data/user";
import { AuthResponse } from "../../../models/responses";

class UserService {
   private resource: string;

   static instance: UserService;

   constructor() {
      this.resource = "me";
   }

   static getInstance(): UserService {
      if (!UserService.instance) UserService.instance = new UserService();
      return UserService.instance;
   }

   public async get(): Promise<User> {
      const response = await callApiProtected(`${this.resource}`);
      if (response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if (response.status === 401) {
         throw new UnauthorizedError();
      }
      if (response.status >= 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      return {
         firstName: body.firstName,
         lastName: body.lastName,
         email: body.email,
         isMfaVerified: body.isMfaVerified,
         createdOn: new Date(body.createdOn),
         modifiedOn: new Date(body.modified),
         device: {
            os: body.device.os
         },
         notificationPreferences: {
            paymentNotifications:
               body.notificationPreferences.paymentNotifications,
            incomeNotifications:
               body.notificationPreferences.incomeNotifications
         }
      };
   }

   public async updatePassword(password: string): Promise<AuthResponse> {
      const key = await getItem(StorageKeys.ConfirmationKey);
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ password })
      };
      const response = await callApi(
         `${this.resource}/resetPassword/${key}`,
         options
      );
      if (response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if (response.status === 401) {
         throw new UnauthorizedError();
      }
      if (response.status >= 500) {
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
   }

   public async registerDevice(deviceToken: string): Promise<void> {
      const body = {
         device: Platform.OS,
         token: deviceToken
      };
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(body)
      };
      const response = await callApiProtected(
         `${this.resource}/registerDevice`,
         options
      );
      if (response.status === 400) {
         const responseBody = await response.json();
         throw new GeneralError(responseBody.message);
      }
      if (response.status === 401) {
         throw new UnauthorizedError();
      }
      if (response.status >= 500) {
         const responseBody = await response.json();
         throw new InternalServerError(responseBody.message);
      }
   }

   public async update(user: Partial<UpdateUserBody>): Promise<User> {
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(user)
      };
      const response = await callApiProtected(`${this.resource}`, options);
      if (response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if (response.status === 401) {
         throw new UnauthorizedError();
      }
      if (response.status >= 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const responseBody = await response.json();
      return {
         firstName: responseBody.firstName,
         lastName: responseBody.lastName,
         email: responseBody.email,
         isMfaVerified: responseBody.isMfaVerified,
         createdOn: new Date(responseBody.createdOn),
         modifiedOn: new Date(responseBody.modified),
         device: {
            os: responseBody.device.os
         },
         notificationPreferences: {
            paymentNotifications:
               responseBody.notificationPreferences.paymentNotifications,
            incomeNotifications:
               responseBody.notificationPreferences.incomeNotifications
         }
      };
   }
}

export default {
   getInstance: (): UserService => UserService.getInstance()
};
