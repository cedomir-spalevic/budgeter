import { Budget, BudgetPayment, BudgetResponse } from "../models";
import ApiConfig from "../config";

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

   public async getBudgets(): Promise<Budget[]> {
      const apiConfig = ApiConfig.getInstance();
      const response = await apiConfig.callApiProtected(this.resource);
      if (response.status !== 200)
         throw "Unable to get Budgets";

      const budgets = await response.json() as any[];
      return budgets.map(x => ({
         budgetId: x.budgetId,
         name: x.name,
         startDate: new Date(x.startDate),
         endDate: new Date(x.endDate),
         completed: x.completed,
         payments: []
      }))
   }

   public async deleteBudget(budgetId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "DELETE"
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}`, options);
      if (response.status !== 200)
         throw "Unable to delete Budget";
   }

   public async createBudget(budget: Budget): Promise<BudgetResponse> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(budget)
      };
      const response = await apiConfig.callApiProtected(this.resource, options);
      return await response.json() as BudgetResponse;
   }

   public async updateBudget(budget: Budget): Promise<BudgetResponse> {
      const apiConfig = ApiConfig.getInstance();
      let updatedBudget = { ...budget };
      updatedBudget.budgetId = undefined;
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(updatedBudget)
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${budget.budgetId}`, options);
      return await response.json() as BudgetResponse;
   }

   public async addPayment(budgetId: string, paymentId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      let body = { paymentId };
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(body)
      }
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}/payments`, options);
      if (response.status !== 201)
         throw "Error adding payment to budget";
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
      if (response.status !== 200)
         throw "Unable to delete payment";
   }

   public async getBudgetPayments(budgetId: string): Promise<BudgetPayment[]> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "GET",
         headers: {
            "Content-Type": "application/json"
         }
      }
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}/payments`, options);
      if (response.status !== 200)
         throw "Unable to get Budget Payments";

      const budgetPayments = await response.json() as any[];
      return budgetPayments.map(x => ({
         paymentId: x.paymentId,
         completed: x.completed
      }))
   }

   public async completePayment(budgetId: string, paymentId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         }
      }
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}/payments/${paymentId}/complete`, options);
      if (response.status !== 200)
         throw "Unable to complete payment";
   }

   public async uncompletePayment(budgetId: string, paymentId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         }
      }
      const response = await apiConfig.callApiProtected(`${this.resource}/${budgetId}/payments/${paymentId}/uncomplete`, options);
      if (response.status !== 200)
         throw "Unable to uncomplete payment";
   }
}

export default {
   getInstance: () => BudgetsService.getInstance()
}