import ApiConfig from "../config";
import { 
   AlreadyExistsError, 
   GeneralError, 
   InternalServerError, 
   NotFoundError, 
   UnauthorizedError 
} from "../models/errors";
import { AuthResponse } from "../models/responses";

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

   async login(email: string, password: string): Promise<AuthResponse> {
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
      if(response.status === 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      return {
         token: body.token
      }
   }

   async verify(): Promise<boolean> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST"
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/verify`, options);
      return response.status === 200;
   }

   async register(email: string, password: string): Promise<AuthResponse> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password })
      };
      const response = await apiConfig.callApi(`${this.resource}/register`, options);
      if(response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if(response.status === 409) {
         throw new AlreadyExistsError();
      }
      if(response.status === 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      return {
         token: body.token
      }
   }
}

export default {
   getInstance: () => AuthenticationService.getInstance()
}