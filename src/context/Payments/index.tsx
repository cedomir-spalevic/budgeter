import { useAuth } from "context";
import React, { useState, useRef } from "react";
import { Alert } from "react-native";
import { Payment } from "services/models/data/payment";
import { UnauthorizedError } from "services/models/errors";
import {
   createPayment,
   deletePayment,
   getPayments,
   updatePayment
} from "services/external/graphql/payments/request";

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

const PaymentsContext = React.createContext<Context>(undefined!);

const PaymentsProvider: React.FC<Props> = (props: Props) => {
   const [empty, setEmpty] = useState<boolean>(false);
   const [values, setValues] = useState<Payment[]>([]);
   const reachedEnd = useRef<boolean>(false);
   const auth = useAuth();

   const get = async (search?: string) => {
      try {
         if (reachedEnd.current) return;
         const payments = await getPayments(10, values.length, search);
         reachedEnd.current = !search && payments.length === 0;
         setValues([...values, ...payments]);
         setEmpty(!search && values.length === 0 && payments.length === 0);
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

   const create = async (input: Partial<Payment>) => {
      try {
         const payment = await createPayment(input);
         const isEmpty = values.length === 0;
         values.push(payment);
         setValues([...values]);
         if (isEmpty) setEmpty(false);
         reachedEnd.current = false;
         return true;
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return false;
         }
         Alert.alert(
            "Unable to create payment",
            "We're having trouble creating this payment at the moment."
         );
         return false;
      }
   };

   const update = async (id: string, input: Partial<Payment>) => {
      try {
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return false;
         const payment = await updatePayment(id, input);
         values[index] = payment;
         setValues([...values]);
         return true;
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return false;
         }
         Alert.alert(
            "Unable to update payment",
            "We're having trouble updating this payment at the moment."
         );
         return false;
      }
   };

   const remove = async (id: string) => {
      try {
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return false;
         await deletePayment(id);
         const willBeEmpty = values.length === 1;
         values.splice(index, 1);
         setValues([...values]);
         if (willBeEmpty) setEmpty(true);
         reachedEnd.current = false;
         return true;
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return false;
         }
         Alert.alert(
            "Unable to delete payment",
            "We're having trouble deleting this payment at the moment."
         );
         return false;
      }
   };

   return (
      <PaymentsContext.Provider
         value={{ empty, values, get, create, update, delete: remove }}
      >
         {props.children}
      </PaymentsContext.Provider>
   );
};

export const usePayments = (): Context =>
   React.useContext<Context>(PaymentsContext);

export default PaymentsProvider;
