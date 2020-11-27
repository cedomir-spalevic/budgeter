import ApiConfig from "../config";
import { AuthenticationResponse } from "../models";

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

   async signin(email: string, password: string): Promise<AuthenticationResponse> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password })
      };
      const response = await apiConfig.callApi(`${this.resource}/signing`, options);
      const authResponse = await response.json();
      return authResponse as AuthenticationResponse;
   }

   async verify(): Promise<boolean> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST"
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/verify`, options);
      return response.status === 200;
   }

   async register(email: string, password: string): Promise<AuthenticationResponse> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password })
      };
      const response = await apiConfig.callApi(`${this.resource}/signup`, options);
      const authResponse = await response.json();
      return authResponse as AuthenticationResponse;
   }
}

export default {
   getInstance: () => AuthenticationService.getInstance()
}