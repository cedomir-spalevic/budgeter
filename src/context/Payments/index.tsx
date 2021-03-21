import { useAuth } from "context";
import { useBudgets } from "context/Budgets";
import React, { useState, createContext, useContext } from "react";
import { Alert } from "react-native";
import { Payment } from "services/external/api/models/data/payment";
import { UnauthorizedError } from "services/external/api/models/errors";
import PaymentsService from "services/external/api/payments";

interface Props {
   children: React.ReactNode;
}

interface Context {
   empty: boolean;
   values: Payment[];
   get: (searchValue?: string, getNext?: boolean) => Promise<void>;
   create: (Payment: Partial<Payment>) => Promise<boolean>;
   update: (id: string, Payment: Partial<Payment>) => Promise<boolean>;
   delete: (id: string) => Promise<boolean>;
}

const PaymentsContext = createContext<Context>(undefined!);

const PaymentsProvider: React.FC<Props> = (props: Props) => {
   const [empty, setEmpty] = useState<boolean>(false);
   const [count, setCount] = useState<number>(0);
   const [values, setValues] = useState<Payment[]>([]);
   const auth = useAuth();
   const budgets = useBudgets();

   const get = async (search?: string, getNext?: boolean) => {
      try {
         if (getNext && values.length === count) return;
         const paymentsService = PaymentsService.getInstance();
         const skip = getNext ? values.length : 0;
         const p = await paymentsService.get(10, skip, search);
         setCount(p.count);
         if (getNext) setValues([...values, ...p.values]);
         else setValues([...p.values]);
         setEmpty(!search && p.values.length === 0);
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return;
         }
         Alert.alert(
            "Unable to get payments",
            "We're having trouble getting your payments at the moment."
         );
      }
   };

   const create = async (payment: Partial<Payment>) => {
      try {
         const paymentsService = PaymentsService.getInstance();
         const i = await paymentsService.create(payment);
         const isEmpty = values.length === 0;
         values.push(i);
         setValues([...values]);
         setCount(count + 1);
         if (isEmpty) setEmpty(false);
         budgets.get();
         return true;
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return false;
         }
         Alert.alert(
            "Unable to create payment",
            "We're having trouble creating your new payment at the moment."
         );
         return false;
      }
   };

   const update = async (id: string, payment: Partial<Payment>) => {
      try {
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return false;
         const paymentsService = PaymentsService.getInstance();
         const i = await paymentsService.update(id, payment);
         values[index] = i;
         setValues([...values]);
         budgets.get();
         return true;
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return false;
         }
         Alert.alert(
            "Unable to create Payment",
            "We're having trouble creating your new Payment at the moment."
         );
         return false;
      }
   };

   const deletePayment = async (id: string) => {
      try {
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return false;
         const paymentsService = PaymentsService.getInstance();
         await paymentsService.delete(id);
         const willBeEmpty = values.length === 1;
         values.splice(index, 1);
         setValues([...values]);
         setCount(count - 1);
         if (willBeEmpty) setEmpty(true);
         // Update budget
         budgets.get();
         return true;
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return false;
         }
         Alert.alert(
            "Unable to create payment",
            "We're having trouble creating your new payment at the moment."
         );
         return false;
      }
   };

   return (
      <PaymentsContext.Provider
         value={{ empty, values, get, create, update, delete: deletePayment }}
      >
         {props.children}
      </PaymentsContext.Provider>
   );
};

export const usePayments = (): Context => useContext<Context>(PaymentsContext);

export default PaymentsProvider;
