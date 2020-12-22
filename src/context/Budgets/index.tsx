import React, { useState, createContext, useContext } from "react";
import { Budget } from "services/external/api/models/data";
import BudgetsService from "services/external/api/budgets";

interface Response {
   formError?: string;
}

interface Props {
   children: React.ReactNode;
}

interface Context {
   values: Budget[];
   getBudgets: () => Promise<void>;
   createBudget: (budget: Partial<Budget>) => Promise<Response | undefined>;
   updateBudget: (budgetId: string, budget: Partial<Budget>) => Promise<Response | undefined>;
   deleteBudget: (budgetId: string) => Promise<void>;
   addPayment: (budgetId: string, paymentId: string) => Promise<void>;
   removePayment: (budgetId: string, paymentId: string) => Promise<void>;
   updatePayment: (budgetId: string, paymentId: string, completed: boolean) => Promise<void>;
}

export const BudgetsContext = createContext<Context>(undefined!);

const BudgetsProvider: React.FC<Props> = (props: Props) => {
   const [budgets, setBudgets] = useState<Budget[]>([]);
   const [count, setCount] = useState<number>(0);

   const getBudgets = async () => {
      try {
         const budgetsService = BudgetsService.getInstance();
         const response = await budgetsService.getBudgets(5, budgets.length);
         setCount(response.count);
         budgets.push(...response.values);
         setBudgets([...budgets]);
      }
      catch (error) {
         console.error("Error occurred while getting budgets");
         console.error(error);
      }
   }

   const createBudget = async (budget: Partial<Budget>) => {
      try {
         const budgetsService = BudgetsService.getInstance();
         const newBudget = await budgetsService.createBudget(budget);
         budgets.push(newBudget);
         setBudgets([...budgets]);
         return undefined;
      }
      catch(error) {
         console.error("Error occurred while creating budget");
         console.error(error);
         return { formError: error.message }
      }
   }

   const updateBudget = async (budgetId: string, budget: Partial<Budget>) => {
      try {
         const index = budgets.findIndex(x => x._id === budgetId);
         if(index === -1)
            return;
         const budgetsService = BudgetsService.getInstance();
         const updatedBudget = await budgetsService.updateBudget(budgetId, budget);
         budgets[index] = updatedBudget;
         setBudgets([...budgets]);
         return undefined;
      }
      catch(error) {
         console.error(`Error occurred while updating budget ${budgetId}`);
         console.error(error);
         return { formError: error.message }
      }
   }

   const deleteBudget = async (budgetId: string): Promise<void> => {
      try {
         const index = budgets.findIndex(x => x._id === budgetId);
         if(index === -1)
            return;
         const budgetsService = BudgetsService.getInstance();
         await budgetsService.deleteBudget(budgetId);
         budgets.splice(index, 1);
         setCount(count-1);
         setBudgets([...budgets]);
      }
      catch (error) {
         console.error(`Error occurred while deleting budget ${budgetId}`);
         console.error(error);
      }
   }

   const addPayment = async (budgetId: string, paymentId: string) => {
      try {
         const index = budgets.findIndex(x => x._id === budgetId);
         if(index === -1)
            return;
         const budget = budgets[index];
         const budgetsService = BudgetsService.getInstance();
         await budgetsService.addPayment(budgetId, paymentId);
         if (budget.payments === undefined)
            budget.payments = [];
         budget.payments.push({ paymentId, completed: false })
         budgets[index] = budget;
         setBudgets([...budgets]);

      }
      catch (error) {
         console.error(`Error occurred while adding payment ${paymentId} to budget ${budgetId}`);
         console.error(error);
      }
   }

   const removePayment = async (budgetId: string, paymentId: string) => {
      try {
         const budgetIndex = budgets.findIndex(x => x._id === budgetId);
         if(budgetIndex === -1)
            return;
         const budget = budgets[budgetIndex];
         const paymentIndex = budget.payments.findIndex(x => x.paymentId === paymentId);
         if(paymentIndex === -1)
            return;
         const budgetsService = BudgetsService.getInstance();
         await budgetsService.removePayment(budgetId, paymentId);
         budget.payments.splice(paymentIndex, 1);
         budgets[budgetIndex] = budget;
         setBudgets([...budgets]);
      }
      catch (error) {
         console.error(`Error occurred while removing payment ${paymentId} from budget ${budgetId}`);
         console.error(error);
      }
   }

   const updatePayment = async (budgetId: string, paymentId: string, completed: boolean) => {
      try {
         const budgetIndex = budgets.findIndex(x => x._id === budgetId);
         if(budgetIndex === -1)
            return;
         const budget = budgets[budgetIndex];
         const paymentIndex = budget.payments.findIndex(x => x.paymentId === paymentId);
         if(paymentIndex === -1)
            return;
         const budgetsService = BudgetsService.getInstance();
         await budgetsService.updatePayment(budgetId, paymentId, completed);
         budget.payments[paymentIndex].completed = completed;
         budgets[budgetIndex] = budget;
         setBudgets([...budgets]);
      }
      catch (error) {
         console.error(`Error occurred while updating payment ${paymentId} from budget ${budgetId}`);
         console.error(error);
      }
   }

   const state = {
      values: budgets,
      createBudget,
      updateBudget,
      getBudgets,
      deleteBudget,
      addPayment,
      removePayment,
      updatePayment
   }

   return (
      <BudgetsContext.Provider value={state}>
         {props.children}
      </BudgetsContext.Provider>
   )
};

export const useBudgets = (): Context => {
   const budgets = useContext<Context>(BudgetsContext);

   return budgets;
}

export default BudgetsProvider;