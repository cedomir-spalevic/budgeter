import { Income } from "../models/data/income";
import ApiConfig from "../config";
import { ListResponse } from "../models/responses";
import { GeneralError, InternalServerError, NotFoundError, UnauthorizedError } from "../models/errors";

class IncomesService {
   private resource: string;
   static instance: IncomesService;

   constructor() {
      this.resource = "incomes";
   }

   static getInstance(): IncomesService {
      if(!IncomesService.instance)
        IncomesService.instance = new IncomesService();
      return IncomesService.instance;
   }

   public async get(limit: number, skip: number, search?: string): Promise<ListResponse<Income>> {
      const apiConfig = ApiConfig.getInstance();
      let url = `${this.resource}?limit=${limit}&skip=${skip}`;
      if(search)
        url += `&search=${search}`;
      const response = await apiConfig.callApiProtected(url);
      const responseBody = await response.json();
      if(response.status === 400) {
         throw new GeneralError(responseBody.message);
      }
      if(response.status === 401) {
          throw new UnauthorizedError();
      }
      if(response.status === 500) {
         throw new InternalServerError(responseBody.message);
      }
      return {
         count: responseBody.count,
         values: responseBody.values.map(x => ({
            id: x.id,
            title: x.title,
            amount: x.amount,
            occurrenceDate: new Date(x.occurrenceDate),
            recurrence: x.recurrence,
            createdOn: new Date(x.createdOn),
            modifiedOn: new Date(x.modifiedOn)
         }))
      }
   }

   public async delete(incomeId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "DELETE"
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${incomeId}`, options);
      if(response.status === 400) {
         const responseBody = await response.json();
         throw new GeneralError(responseBody.message);
      }
      if(response.status === 404) {
         throw new NotFoundError();
      }
      if(response.status === 500) {
         const responseBody = await response.json();
         throw new InternalServerError(responseBody.message);
      }
   }

   public async create(income: Partial<Income>): Promise<Income> {
      console.log(income);
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ income })
      };
      const response = await apiConfig.callApiProtected(this.resource, options);
      const responseBody = await response.json();
      if(response.status === 400) {
         throw new GeneralError(responseBody.message);
      }
      if(response.status === 500) {
         throw new InternalServerError(responseBody.message);
      }
      return {
        id: responseBody.id,
        title: responseBody.title,
        amount: responseBody.amount,
        occurrenceDate: new Date(responseBody.occurrenceDate),
        recurrence: responseBody.recurrence,
        createdOn: new Date(responseBody.createdOn),
        modifiedOn: new Date(responseBody.modifiedOn)
      }
   }

   public async update(incomeId: string, income: Partial<Income>): Promise<Income> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ income })
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${incomeId}`, options);
      if(response.status === 400) {
         const responseBody = await response.json();
         throw new GeneralError(responseBody.message);
      }
      if(response.status === 404) {
         throw new NotFoundError();
      }
      if(response.status === 500) {
         const responseBody = await response.json();
         throw new InternalServerError(responseBody.message);
      }
      const responseBody = await response.json();
      return {
        id: responseBody.id,
        title: responseBody.title,
        amount: responseBody.amount,
        occurrenceDate: new Date(responseBody.occurrenceDate),
        recurrence: responseBody.recurrence,
        createdOn: new Date(responseBody.createdOn),
        modifiedOn: new Date(responseBody.modifiedOn)
      }
   }
}

export default {
   getInstance: () => IncomesService.getInstance()
}