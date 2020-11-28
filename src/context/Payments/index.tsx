import React, { useState, createContext, useEffect, useContext } from "react";
import PaymentsService from "services/external/api/payments";
import { Payment, PaymentResponse } from "services/external/api/models";

interface Props {
   children: React.ReactNode;
}

interface Context {
   payments: Payment[];
   getPayments?: () => Promise<void>;
   paymentOnSave?: (payment: Payment) => Promise<PaymentResponse | undefined>;
   deletePayment?: (payment: Payment) => Promise<boolean>;
}

const defaultValue: Context = {
   payments: []
}

export const PaymentsContext = createContext<Context>(defaultValue);

const PaymentsProvider: React.FC<Props> = (props: Props) => {
   const [payments, setPayments] = useState<Payment[]>([]);

   const getPayments = async () => {
      try {
         const paymentsService = PaymentsService.getInstance();
         const payments = await paymentsService.getPayments();
         setPayments([...payments]);
      }
      catch (error) {

      }
   }

   const deletePayment = async (payment: Payment) => {
      try {
         const paymentsService = PaymentsService.getInstance();
         await paymentsService.deletePayment(payment.paymentId);
         const index = payments.findIndex(x => x.paymentId === payment.paymentId);
         payments.splice(index, 1);
         setPayments([...payments]);
         return true;
      }
      catch (error) {
         return false;
      }
   }

   const paymentOnSave = async (payment: Payment): Promise<PaymentResponse> => {
      try {
         const paymentsService = PaymentsService.getInstance();
         let paymentResponse: PaymentResponse;
         if (!payment.paymentId) {
            paymentResponse = await paymentsService.createPayment(payment);
            if (!paymentResponse.valid)
               return paymentResponse;
            payment.paymentId = paymentResponse.paymentId;
            payments.push(payment);
         }
         else {
            paymentResponse = await paymentsService.updatePayment(payment);
            if (!paymentResponse.valid)
               return paymentResponse;
            const index = payments.findIndex(x => x.paymentId === payment.paymentId);
            payments[index] = payment;
         }
         setPayments([...payments]);
         return paymentResponse;
      }
      catch (error) {
         return undefined;
      }
   }

   useEffect(() => {
      getPayments();
   }, [])

   return (
      <PaymentsContext.Provider value={{ payments, getPayments, paymentOnSave, deletePayment }}>
         {props.children}
      </PaymentsContext.Provider>
   )
};

export const usePayments = (): Context => {
   const payments = useContext<Context>(PaymentsContext);

   return payments;
}

export default PaymentsProvider;