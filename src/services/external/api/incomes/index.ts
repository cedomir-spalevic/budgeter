import { Income } from "../models/data/income";
import { callApiProtected } from "../apiFetch";
import { ListResponse } from "../models/responses";
import {
   GeneralError,
   InternalServerError,
   NotFoundError,
   UnauthorizedError
} from "../models/errors";

class IncomesService {
   private resource: string;

   static instance: IncomesService;

   constructor() {
      this.resource = "incomes";
   }

   static getInstance(): IncomesService {
      if (!IncomesService.instance)
         IncomesService.instance = new IncomesService();
      return IncomesService.instance;
   }

   public async get(
      limit: number,
      skip: number,
      search?: string
   ): Promise<ListResponse<Income>> {
      let url = `${this.resource}?limit=${limit}&skip=${skip}`;
      if (search) url += `&search=${search}`;
      const response = await callApiProtected(url);
      const responseBody = await response.json();
      if (response.status === 400) {
         throw new GeneralError(responseBody.message);
      }
      if (response.status === 401) {
         throw new UnauthorizedError();
      }
      if (response.status === 500) {
         throw new InternalServerError(responseBody.message);
      }
      return {
         count: responseBody.count,
         values: responseBody.values.map((x) => ({
            id: x.id,
            title: x.title,
            amount: x.amount,
            initialDay: x.initialDay,
            initialDate: x.initialDate,
            initialMonth: x.initialMonth,
            initialYear: x.initialYear,
            recurrence: x.recurrence,
            createdOn: new Date(x.createdOn),
            modifiedOn: new Date(x.modifiedOn)
         }))
      };
   }

   public async delete(incomeId: string): Promise<void> {
      const options: RequestInit = {
         method: "DELETE"
      };
      const response = await callApiProtected(
         `${this.resource}/${incomeId}`,
         options
      );
      if (response.status === 400) {
         const responseBody = await response.json();
         throw new GeneralError(responseBody.message);
      }
      if (response.status === 404) {
         throw new NotFoundError();
      }
      if (response.status === 500) {
         const responseBody = await response.json();
         throw new InternalServerError(responseBody.message);
      }
   }

   public async create(income: Partial<Income>): Promise<Income> {
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(income)
      };
      const response = await callApiProtected(this.resource, options);
      const responseBody = await response.json();
      if (response.status === 400) {
         throw new GeneralError(responseBody.message);
      }
      if (response.status === 500) {
         throw new InternalServerError(responseBody.message);
      }
      return {
         id: responseBody.id,
         title: responseBody.title,
         amount: responseBody.amount,
         initialDay: responseBody.initialDay,
         initialDate: responseBody.initialDate,
         initialMonth: responseBody.initialMonth,
         initialYear: responseBody.initialYear,
         recurrence: responseBody.recurrence,
         createdOn: new Date(responseBody.createdOn),
         modifiedOn: new Date(responseBody.modifiedOn)
      };
   }

   public async update(
      incomeId: string,
      income: Partial<Income>
   ): Promise<Income> {
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(income)
      };
      const response = await callApiProtected(
         `${this.resource}/${incomeId}`,
         options
      );
      if (response.status === 400) {
         const responseBody = await response.json();
         throw new GeneralError(responseBody.message);
      }
      if (response.status === 404) {
         throw new NotFoundError();
      }
      if (response.status === 500) {
         const responseBody = await response.json();
         throw new InternalServerError(responseBody.message);
      }
      const responseBody = await response.json();
      return {
         id: responseBody.id,
         title: responseBody.title,
         amount: responseBody.amount,
         initialDay: responseBody.initialDay,
         initialDate: responseBody.initialDate,
         initialMonth: responseBody.initialMonth,
         initialYear: responseBody.initialYear,
         recurrence: responseBody.recurrence,
         createdOn: new Date(responseBody.createdOn),
         modifiedOn: new Date(responseBody.modifiedOn)
      };
   }
}

export default {
   getInstance: (): IncomesService => IncomesService.getInstance()
};
