import ApiConfig from "../config";
import { AuthenticationResponse } from "../models";
import { GeneralError, InternalServerError, NoUserFoundError, UnauthorizedError } from "../models/errors";
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

   async signin(email: string, password: string): Promise<AuthResponse> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password })
      };
      const response = await apiConfig.callApi(`${this.resource}/signin`, options);
      console.log(response)
      if(response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if(response.status === 401) {
         throw new UnauthorizedError();
      }
      if(response.status === 404) {
         throw new NoUserFoundError();
      }
      if(response.status === 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      return {
         token: body.token,
         user: {
            _id: body.user._id,
            email: body.user.email,
            isAdmin: body.user.isAdmin,
            isService: body.user.isService,
            createdOn: new Date(body.user.createdOn),
            modifiedOn: new Date(body.user.modifiedOn)
         }
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

   async register(email: string, password: string): Promise<AuthenticationResponse> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password })
      };
      const response = await apiConfig.callApi(`${this.resource}/register`, options);
      const authResponse = await response.json();
      return authResponse as AuthenticationResponse;
   }
}

export default {
   getInstance: () => AuthenticationService.getInstance()
}