import { Income } from "../../../models/data/income";
import { getClient } from "../client";
import { createIncomeMutation, deleteIncomeMutation, incomeByIdQuery, incomesQuery, updateIncomeMutation } from "./query";

const transformResponse = (income: Income) => ({
   id: income.id,
   title: income.title,
   amount: income.amount,
   initialDay: income.initialDay,
   initialDate: income.initialDate,
   initialMonth: income.initialMonth,
   initialYear: income.initialYear,
   recurrence: income.recurrence,
   createdOn: new Date(income.createdOn),
   modifiedOn: new Date(income.modifiedOn)
})

export const getIncomes = async (limit: number, skip: number, search?: string): Promise<Income[]> => {
   const client = getClient();
   const result = await client.query({
      query: incomesQuery,
      variables: {
         limit,
         skip,
         search
      }
   });
   const incomes = result.data.incomes as Income[];
   return incomes.map(transformResponse);
}

export const getIncomeById = async (id: string): Promise<Income> => {
   const client = getClient();
   const result = await client.query({
      query: incomeByIdQuery,
      variables: {
         id
      }
   });
   const income = result.data.incomeById as Income;
   return transformResponse(income);
}

export const createIncome = async (input: Partial<Income>): Promise<Income> => {
   console.log(input);
   const client = getClient();
   const result = await client.mutate({
      mutation: createIncomeMutation,
      variables: {
         income: input
      }
   })
   const income = result.data.createIncome as Income;
   return transformResponse(income);
}

export const updateIncome = async (id: string, input: Partial<Income>): Promise<Income> => {
   const client = getClient();
   const result = await client.mutate({
      mutation: updateIncomeMutation,
      variables: {
         id,
         income: input
      }
   })
   const income = result.data.updateIncome as Income;
   return transformResponse(income);
}

export const deleteIncome = async (id: string): Promise<void> => {
   const client = getClient();
   await client.mutate({
      mutation: deleteIncomeMutation,
      variables: {
         id
      }
   })
}