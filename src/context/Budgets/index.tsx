import React, { useState, createContext } from "react";
import { Budget, BudgetResponse } from "services/external/api/models";
import BudgetsService from "services/external/api/budgets";


interface Props {
   children: React.ReactNode;
}

interface Context {
   budgets: Budget[];
   getBudgets?: () => Promise<void>;
   budgetOnSave?: (budget: Budget) => Promise<BudgetResponse | undefined>;
   deleteBudget?: (budgetId: string) => Promise<boolean>;
   addPayment?: (budget: Budget, paymentId: string) => Promise<boolean>;
   removePayment?: (budget: Budget, paymentId: string) => Promise<boolean>;
   completePayment?: (budget: Budget, paymentId: string, value: Boolean) => Promise<Budget>;
   getPayments?: (budget: Budget) => Promise<Budget>;
}

const defaultValue: Context = {
   budgets: []
}

export const BudgetsContext = createContext<Context>(defaultValue);

const BudgetsContainer: React.FC<Props> = (props: Props) => {
   const [budgets, setBudgets] = useState<Budget[]>([]);

   const getBudgets = async () => {
      try {
         const budgetsService = BudgetsService.getInstance();
         const budgets = await budgetsService.getBudgets();
         setBudgets([...budgets]);
      }
      catch (error) {
         // TODO
      }
   }

   const deleteBudget = async (budgetId: string): Promise<boolean> => {
      try {
         const budgetsService = BudgetsService.getInstance();
         const budgetIndex = budgets.findIndex(x => x.budgetId === budgetId);
         budgets.splice(budgetIndex, 1);
         setBudgets([...budgets]);
         return true;
      }
      catch (error) {
         return false;
      }
   }

   const budgetOnSave = async (budget: Budget): Promise<BudgetResponse> => {
      try {
         const budgetsService = BudgetsService.getInstance();
         let budgetResponse: BudgetResponse;
         if (!budget.budgetId) {
            budgetResponse = await budgetsService.createBudget(budget);
            if (!budgetResponse.valid)
               return budgetResponse;
            budget.budgetId = budgetResponse.budgetId;
            budgets.push(budget);
         }
         else {
            budgetResponse = await budgetsService.updateBudget(budget);
            if (!budgetResponse.valid)
               return budgetResponse;
            const index = budgets.findIndex(x => x.budgetId === budget.budgetId);
            budgets[index] = budget;
         }
         setBudgets([...budgets]);
         return budgetResponse;
      }
      catch (error) {
         return undefined;
      }
   }

   const addPayment = async (budget: Budget, paymentId: string) => {
      try {
         const budgetsService = BudgetsService.getInstance();
         await budgetsService.addPayment(budget.budgetId, paymentId);
         if (budget.payments === undefined)
            budget.payments = [];
         budget.payments.push({ paymentId, completed: false })
         const index = budgets.findIndex(x => x.budgetId === budget.budgetId);
         budgets[index] = budget;
         setBudgets([...budgets]);
         return true;

      }
      catch (error) {
         return false;
      }
   }

   const removePayment = async (budget: Budget, paymentId: string) => {
      try {
         const budgetsService = BudgetsService.getInstance();
         await budgetsService.removePayment(budget.budgetId, paymentId);
         let index = budget.payments.findIndex(x => x.paymentId === paymentId);
         budget.payments.splice(index, 1);
         index = budgets.findIndex(x => x.budgetId === budget.budgetId);
         budgets[index] = budget;
         setBudgets([...budgets]);
         return true;
      }
      catch (error) {
         return false;
      }
   }

   const getPayments = async (budget: Budget) => {
      try {
         const budgetsService = BudgetsService.getInstance();
         const budgetPayments = await budgetsService.getBudgetPayments(budget.budgetId);
         if (budget.payments === undefined)
            budget.payments = [];
         budget.payments.push(...budgetPayments)
         const index = budgets.findIndex(x => x.budgetId === budget.budgetId);
         budgets[index] = budget;
         setBudgets([...budgets]);
         return budget;
      }
      catch (error) {
         return budget;
      }
   }

   const completePayment = async (budget: Budget, paymentId: string, value: boolean) => {
      try {
         const budgetsService = BudgetsService.getInstance();
         if (value) await budgetsService.completePayment(budget.budgetId, paymentId);
         else await budgetsService.uncompletePayment(budget.budgetId, paymentId);
         let index = budget.payments.findIndex(x => x.paymentId === paymentId);
         budget.payments[index].completed = value;
         index = budgets.findIndex(x => x.budgetId === budget.budgetId);
         budgets[index] = budget;
         setBudgets([...budgets]);
         return budget;
      }
      catch (error) {
         return budget;
      }
   }

   return (
      <BudgetsContext.Provider value={{ budgets, getBudgets, budgetOnSave, deleteBudget, addPayment, removePayment, completePayment, getPayments }}>
         {props.children}
      </BudgetsContext.Provider>
   )
};

export default BudgetsContainer;