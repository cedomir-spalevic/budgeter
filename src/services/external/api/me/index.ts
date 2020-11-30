import ApiConfig from "../config";
import { Platform } from "react-native";

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