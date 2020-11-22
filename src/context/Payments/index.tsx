import React, { useState, createContext, useEffect } from "react";
import SecureStorage from "react-native-secure-storage";
import { SecureStorageKeys } from "../Auth";
import PaymentsService from "services/api/payments";
import { Payment, PaymentResponse } from "services/api/models";


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

const PaymentsContainer: React.FC<Props> = (props: Props) => {
   const [payments, setPayments] = useState<Payment[]>([]);

   const getPayments = async () => {
      try {
         const token = await SecureStorage.getItem(SecureStorageKeys.BudgeterKey);
         const paymentsService = new PaymentsService(token);
         const payments = await paymentsService.getPayments();
         setPayments([...payments]);
      }
      catch (error) {

      }
   }

   const deletePayment = async (payment: Payment) => {
      try {
         const token = await SecureStorage.getItem(SecureStorageKeys.BudgeterKey);
         const paymentsService = new PaymentsService(token);
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
         const token = await SecureStorage.getItem(SecureStorageKeys.BudgeterKey);
         const paymentsService = new PaymentsService(token);
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
      <PaymentsContext.Provider value={{ payments, getPayments, paymentOnSave }}>
         {props.children}
      </PaymentsContext.Provider>
   )
};

export default PaymentsContainer;