import EnvironmentService, { Environment } from "services/internal/environment";
import { getItem, StorageKeys } from "services/internal/storage";

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
            return "http://192.168.1.108:3000/api/";
         case Environment.Dev:
            return "https://4hdyvf9voi.execute-api.us-east-1.amazonaws.com/prod/";
         case Environment.Prod:
            return "";
      }
   }

   public callApi(endpoint: string, init?: RequestInit): Promise<Response> {
      const url = `${this.baseUrl}${endpoint}`;
      return fetch(url, init);
   }

   public async callApiProtected(endpoint: string, init?: RequestInit): Promise<Response> {
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