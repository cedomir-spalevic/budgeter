import React, { useState, createContext, useContext } from "react";
import PaymentsService from "services/external/api/payments";
import { Payment } from "services/external/api/models/data";
import { useBudgets } from "context/Budgets";

interface Response {
   formError?: string;
}

interface Props {
   children: React.ReactNode;
}

interface Context {
   values: Payment[];
   getPayments: () => Promise<void>;
   createPayment: (payment: Partial<Payment>, budgetId?: string) => Promise<Response | undefined>;
   updatePayment: (paymentId: string, payment: Partial<Payment>) => Promise<Response | undefined>;
   deletePayment: (paymentId: string) => Promise<void>;
}

export const PaymentsContext = createContext<Context>(undefined!);

const PaymentsProvider: React.FC<Props> = (props: Props) => {
   const budgets = useBudgets();
   const [count, setCount] = useState<number>(0);
   const [payments, setPayments] = useState<Payment[]>([]);

   const getPayments = async () => {
      try {
         const paymentsService = PaymentsService.getInstance();
         const response = await paymentsService.getPayments(5, payments.length);
         setCount(response.count);
         payments.push(...response.values);
         setPayments([...payments]);
      }
      catch (error) {
         console.error("Error occurred while getting payments");
         console.error(error);
      }
   }

   const deletePayment = async (paymentId: string) => {
      try {
         const index = payments.findIndex(x => x._id === paymentId);
         if(index === -1)
            return;
         const paymentsService = PaymentsService.getInstance();
         await paymentsService.deletePayment(paymentId);
         payments.splice(index, 1);
         setCount(count-1);
         setPayments([...payments]);
         const budgetsThatContainsPayment = budgets.values
            .filter(x => x.payments.filter(y => y.paymentId === paymentId).length > 0);
         await Promise.all(budgetsThatContainsPayment.map(x => {
            return new Promise(async (resolve, reject) => {
               await budgets.removePayment(x._id, paymentId);
               resolve();
            })
         }))
      }
      catch (error) {
         console.error(`Error occurred while deleting payment ${paymentId}`);
         console.error(error);
      }
   }

   const createPayment = async (payment: Partial<Payment>, budgetId: string) => {
      try {
         const paymentsService = PaymentsService.getInstance();
         const newPayment = await paymentsService.createPayment(payment);
         payments.push(newPayment);
         setPayments([...payments]);
         if(budgetId)
            await budgets.addPayment(budgetId, newPayment._id);
         return undefined;
      }
      catch(error) {
         console.error("Error occurred while creating budget");
         console.error(error);
         return { formError: error.message }
      }
   }

   const updatePayment = async (paymentId: string, payment: Partial<Payment>) => {
      try {
         const index = payments.findIndex(x => x._id === paymentId);
         if(index === -1)
            return;
         const paymentsService = PaymentsService.getInstance();
         const updatedPayment = await paymentsService.updatePayment(paymentId, payment);
         payments[index] = updatedPayment;
         setPayments([...payments]);
         return undefined;
      }
      catch(error) {
         console.error(`Error occurred while updating payment ${paymentId}`);
         console.error(error);
         return { formError: error.message }
      }
   }

   const state = {
      values: payments,
      createPayment,
      updatePayment,
      getPayments,
      deletePayment
   }

   return (
      <PaymentsContext.Provider value={state}>
         {props.children}
      </PaymentsContext.Provider>
   )
};

export const usePayments = (): Context => {
   const payments = useContext<Context>(PaymentsContext);

   return payments;
}

export default PaymentsProvider;