import config from "../";

export interface AuthenticationResponse {
   valid: boolean;
   token?: string;
   emailError?: string;
   passwordError?: string;
}

export default class AuthenticationService {
   resource: string;
   constructor() {
      this.resource = "auth";
   }

   async signin(email: string, password: string): Promise<AuthenticationResponse> {
      
      const url = `${config.budgeterApiUrl}${this.resource}/signin`;
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password })
      };
      const response = await fetch(url, options);
      const authResponse = await response.json();
      return authResponse as AuthenticationResponse;
   }

   async verify(token: string | null): Promise<boolean> {
      const url = `${config.budgeterApiUrl}${this.resource}/verify`;
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Authorization": `Bearer ${token}`
         }
      };
      const response = await fetch(url, options);
      return response.status === 200;
   }

   async register(email: string, password: string): Promise<AuthenticationResponse> {
      const url = `${config.budgeterApiUrl}${this.resource}/signup`;
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ email, password })
      };
      const response = await fetch(url, options);
      const authResponse = await response.json();
      return authResponse as AuthenticationResponse;
   }
}