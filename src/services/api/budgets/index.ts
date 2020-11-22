import { Budget, BudgetPayment, BudgetResponse } from "../models";
import config from "../";

export default class BudgetsService {
   private resource: string;
   private token: string;
   constructor(token) {
      this.resource = "budgets";
      this.token = token;
   }

   public async getBudgets(): Promise<Budget[]> {
      const url = `${config.budgeterApiUrl}${this.resource}`;
      const options: RequestInit = {
         headers: {
            "Authorization": `Bearer ${this.token}`
         }
      };
      const response = await fetch(url, options);
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
      const url = `${config.budgeterApiUrl}${this.resource}/${budgetId}`;
      const options: RequestInit = {
         method: "DELETE",
         headers: {
            "Authorization": `Bearer ${this.token}`
         }
      };
      const response = await fetch(url, options);
      if (response.status !== 200)
         throw "Unable to delete Budget";
   }

   public async createBudget(budget: Budget): Promise<BudgetResponse> {
      const url = `${config.budgeterApiUrl}${this.resource}`;
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
         },
         body: JSON.stringify(budget)
      };
      const response = await fetch(url, options);
      return await response.json() as BudgetResponse;
   }

   public async updateBudget(budget: Budget): Promise<BudgetResponse> {
      const url = `${config.budgeterApiUrl}${this.resource}/${budget.budgetId}`;
      let updatedBudget = { ...budget };
      updatedBudget.budgetId = undefined;
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
         },
         body: JSON.stringify(updatedBudget)
      };
      const response = await fetch(url, options);
      return await response.json() as BudgetResponse;
   }

   public async addPayment(budgetId: string, paymentId: string): Promise<void> {
      const url = `${config.budgeterApiUrl}${this.resource}/${budgetId}/payments`;
      let body = { paymentId };
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
         },
         body: JSON.stringify(body)
      }
      const response = await fetch(url, options);
      if (response.status !== 201)
         throw "Error adding payment to budget";
   }

   public async removePayment(budgetId: string, paymentId: string): Promise<void> {
      const url = `${config.budgeterApiUrl}${this.resource}/${budgetId}/payments/${paymentId}`;
      const options: RequestInit = {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
         }
      }
      const response = await fetch(url, options);
      if (response.status !== 200)
         throw "Unable to delete payment";
   }

   public async getBudgetPayments(budgetId: string): Promise<BudgetPayment[]> {
      const url = `${config.budgeterApiUrl}${this.resource}/${budgetId}/payments`;
      const options: RequestInit = {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
         }
      }
      const response = await fetch(url, options);
      if (response.status !== 200)
         throw "Unable to get Budget Payments";

      const budgetPayments = await response.json() as any[];
      return budgetPayments.map(x => ({
         paymentId: x.paymentId,
         completed: x.completed
      }))
   }

   public async completePayment(budgetId: string, paymentId: string): Promise<void> {
      const url = `${config.budgeterApiUrl}${this.resource}/${budgetId}/payments/${paymentId}/complete`;
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
         }
      }
      const response = await fetch(url, options);
      if (response.status !== 200)
         throw "Unable to complete payment";
   }

   public async uncompletePayment(budgetId: string, paymentId: string): Promise<void> {
      const url = `${config.budgeterApiUrl}${this.resource}/${budgetId}/payments/${paymentId}/uncomplete`;
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
         }
      }
      const response = await fetch(url, options);
      if (response.status !== 200)
         throw "Unable to uncomplete payment";
   }
}