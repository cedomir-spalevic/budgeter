import ApiConfig from "../config";
import { Platform } from "react-native";
import { ForceLogoutError, GeneralError, InternalServerError, UnauthorizedError } from "../models/errors";
import { User } from "../models/data";

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
      if(response.status === 409) {
         throw new ForceLogoutError();
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
         createdOn: new Date(body.createdOn),
         modifiedOn: new Date(body.modified)
      }
   }

   public async updatePassword(password: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ password })
      }
      const response = await apiConfig.callApiSpecialKey(`${this.resource}/resetPassword`, options);
      if (response.status !== 200)
          throw "Unable to register device";
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