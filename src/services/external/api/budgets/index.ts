import { Budget } from "../models/data/budget";
import ApiConfig from "../config";
import { GeneralError, InternalServerError } from "../models/errors";

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

   public async getBudget(day: number, month: number, year: number): Promise<Budget> {
      const apiConfig = ApiConfig.getInstance();
      const url = `${this.resource}?day=${day}&month=${month}&year=${year}`
      const response = await apiConfig.callApiProtected(url);
      const responseBody = await response.json();
      console.log(responseBody)
      if(response.status === 400) {
         throw new GeneralError(responseBody.message);
      }
      if(response.status === 500) {
         throw new InternalServerError(responseBody.message);
      }
      return {
         incomes: responseBody.incomes.map(x => ({
            id: x.id,
            title: x.title,
            amount: x.amount,
            initialDay: x.initialDay,
            initialDate: x.initialDate,
            initialMonth: x.initialMonth,
            initialYear: x.initialYear,
            recurrence: x.recurrence,
            createdOn: new Date(x.createdOn),
            modifiedOn: new Date(x.modifiedOn),
            dueToday: x.dueToday,
            totalAmount: x.totalAmount,
            numberOfOccurrences: x.numberOfOccurrences
         })),
         payments: responseBody.payments.map(x => ({
            id: x.id,
            title: x.title,
            amount: x.amount,
            initialDay: x.initialDay,
            initialDate: x.initialDate,
            initialMonth: x.initialMonth,
            initialYear: x.initialYear,
            recurrence: x.recurrence,
            createdOn: new Date(x.createdOn),
            modifiedOn: new Date(x.modifiedOn),
            dueToday: x.dueToday,
            totalAmount: x.totalAmount,
            numberOfOccurrences: x.numberOfOccurrences
         }))
      }
   }
}

export default {
   getInstance: () => BudgetsService.getInstance()
}