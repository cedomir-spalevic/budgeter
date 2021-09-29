import { Budget } from "services/models/data/budget";
import { getClient } from "../client";
import { budgetQuery } from "./query";

export const getBudget = async (
   date: number,
   month: number,
   year: number
): Promise<Budget> => {
   const client = getClient();
   const result = await client.query({
      query: budgetQuery,
      variables: {
         date,
         month,
         year
      }
   });
   const budget = result.data.budget as Budget;
   return {
      incomes: budget.incomes.map((x) => ({
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
      payments: budget.payments.map((x) => ({
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
         numberOfOccurrences: x.numberOfOccurrences,
         tags: []
      }))
   };
};
