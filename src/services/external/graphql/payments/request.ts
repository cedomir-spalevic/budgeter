import { Payment } from "../../../models/data/payment";
import { getClient } from "../client";
import { createPaymentMutation, deletePaymentMutation, paymentByIdQuery, paymentsQuery, updatePaymentMutation } from "./query";

const transformResponse = (payment: Payment) => ({
   id: payment.id,
   title: payment.title,
   amount: payment.amount,
   initialDay: payment.initialDay,
   initialDate: payment.initialDate,
   initialMonth: payment.initialMonth,
   initialYear: payment.initialYear,
   recurrence: payment.recurrence,
   createdOn: new Date(payment.createdOn),
   modifiedOn: new Date(payment.modifiedOn),
   tags: payment.tags
})

export const getPayments = async (limit: number, skip: number, search?: string): Promise<Payment[]> => {
   const client = getClient();
   const result = await client.query({
      fetchPolicy: "network-only",
      query: paymentsQuery,
      variables: {
         limit,
         skip,
         search
      }
   });
   const payments = result.data.payments as Payment[];
   return payments.map(transformResponse);
}

export const getPaymentById = async (id: string): Promise<Payment> => {
   const client = getClient();
   const result = await client.query({
      query: paymentByIdQuery,
      variables: {
         id
      }
   });
   const payment = result.data.paymentById as Payment;
   return transformResponse(payment);
}

export const createPayment = async (input: Partial<Payment>): Promise<Payment> => {
   const client = getClient();
   const result = await client.mutate({
      mutation: createPaymentMutation,
      variables: {
         payment: input
      }
   })
   const payment = result.data.createPayment as Payment;
   return transformResponse(payment);
}

export const updatePayment = async (id: string, input: Partial<Payment>): Promise<Payment> => {
   const client = getClient();
   const result = await client.mutate({
      mutation: updatePaymentMutation,
      variables: {
         id,
         payment: input
      }
   })
   const payment = result.data.updatePayment as Payment;
   return transformResponse(payment);
}

export const deletePayment = async (id: string): Promise<void> => {
   console.log(id);
   const client = getClient();
   await client.mutate({
      mutation: deletePaymentMutation,
      variables: {
         id
      }
   })
}