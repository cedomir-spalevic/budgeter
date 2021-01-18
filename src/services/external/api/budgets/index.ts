import { Budget } from "../models/data/budget";
import ApiConfig from "../config";
import { ListResponse } from "../models/responses";
import { GeneralError, InternalServerError, NotFoundError } from "../models/errors";

class BudgetsService {
   private resource: string;
   static instance: BudgetsService;

   constructor() {
      this.resource = "budgets";
   }

   static getInstance(): BudgetsService {
      if(!BudgetsService.instance)
         BudgetsService.instance = new BudgetsService();
      return BudgetsService.instance;
   }

   public async getBudgets(limit: number, skip: number): Promise<ListResponse<Budget>> {
      const apiConfig = ApiConfig.getInstance();
      const url = `${this.resource}?limit=${limit}&skip=${skip}`
      const response = await apiConfig.callApiProtected(url);
      const responseBody = await response.json();
      if(response.status === 400) {
         throw new GeneralError(responseBody.message);
      }
      if(response.status === 500) {
         throw new InternalServerError(responseBody.message);
      }
      return {
         count: responseBody.count,
         values: responseBody.values.map(x => ({
            _id: x._id,
            name: x.name,
            startDate: new Date(x.startDate),
            endDate: new Date(x.endDate),
            completed: x.completed,
            createdOn: new Date(x.createdOn),
            modifiedOn: new Date(x.modifiedOn),
            payments: x.payments.map(y => ({
               paymentId: y.paymentId,
               completed: y.paymentId
            }))
         }))
      }
   }

   public async deleteBudget(budgetId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "DELETE"
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}`, options);
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

   public async createBudget(budget: Partial<Budget>): Promise<Budget> {
      const apiConfig = ApiConfig.getInstance();
      const body = {
         name: budget.name,
         startDate: budget.startDate?.toISOString(),
         endDate: budget.endDate?.toISOString()
      }
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(body)
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
         _id: responseBody._id,
         name: responseBody.name,
         startDate: new Date(responseBody.startDate),
         endDate: new Date(responseBody.endDate),
         completed: responseBody.completed,
         createdOn: new Date(responseBody.createdOn),
         modifiedOn: new Date(responseBody.modifiedOn)
      }
   }

   public async updateBudget(budgetId: string, budget: Partial<Budget>): Promise<Budget> {
      const apiConfig = ApiConfig.getInstance();
      const body = {
         name: budget.name,
         startDate: budget.startDate && budget.startDate.toISOString(),
         endDate: budget.endDate && budget.endDate.toISOString(),
         completed: budget.completed
      }
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(body)
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}`, options);
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
         _id: responseBody._id,
         name: responseBody.name,
         startDate: new Date(responseBody.startDate),
         endDate: new Date(responseBody.endDate),
         completed: responseBody.completed,
         createdOn: new Date(responseBody.createdOn),
         modifiedOn: new Date(responseBody.modifiedOn)
      }
   }

   public async addPayment(budgetId: string, paymentId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ paymentId })
      }
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}/payments`, options);
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

   public async removePayment(budgetId: string, paymentId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json"
         }
      }
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}/payments/${paymentId}`, options);
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

   public async updatePayment(budgetId: string, paymentId: string, completed: boolean): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify({ completed })
      }
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}/payments/${paymentId}`, options);
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
}

export default {
   getInstance: () => BudgetsService.getInstance()
}