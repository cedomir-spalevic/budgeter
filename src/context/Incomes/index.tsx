import { useAuth } from "context";
import React, { useState, useRef } from "react";
import { Alert } from "react-native";
import { Income } from "services/models/data/income";
import { UnauthorizedError } from "services/models/errors";
import { createIncome, deleteIncome, getIncomes, updateIncome } from "services/external/graphql/incomes/request";

interface Props {
   children: React.ReactNode;
}

interface Context {
   empty: boolean;
   values: Income[];
   get: (searchValue?: string, getNext?: boolean) => Promise<void>;
   create: (income: Partial<Income>) => Promise<boolean>;
   update: (id: string, income: Partial<Income>) => Promise<boolean>;
   delete: (id: string) => Promise<boolean>;
}

const IncomesContext = React.createContext<Context>(undefined!);

const IncomesProvider: React.FC<Props> = (props: Props) => {
   const [empty, setEmpty] = useState<boolean>(false);
   const [values, setValues] = useState<Income[]>([]);
   const reachedEnd = useRef<boolean>(false);
   const auth = useAuth();

   const get = async (search?: string) => {
      try {
         if (reachedEnd.current) return;
         const incomes = await getIncomes(10, values.length, search);
         reachedEnd.current = !search && incomes.length === 0;
         setValues([...values,...incomes]);
         setEmpty(!search && values.length === 0 && incomes.length === 0);
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
         } else {
            Alert.alert(
               "Unable to get incomes",
               "We're having trouble getting your incomes at the moment."
            );
         }
      }
   };

   const create = async (input: Partial<Income>) => {
      try {
         const income = await createIncome(input);
         const isEmpty = values.length === 0;
         values.push(income);
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
            "Unable to create income",
            "We're having trouble creating this income at the moment."
         );
         return false;
      }
   };

   const update = async (id: string, input: Partial<Income>) => {
      try {
         console.log(input);
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return false;
         const income = await updateIncome(id, input);
         values[index] = income;
         setValues([...values]);
         return true;
      } catch (error) {
         console.log(error);
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return false;
         }
         Alert.alert(
            "Unable to update income",
            "We're having trouble updating this income at the moment."
         );
         return false;
      }
   };

   const remove = async (id: string) => {
      try {
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return false;
         await deleteIncome(id);
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
            "Unable to delete income",
            "We're having trouble deleting this income at the moment."
         );
         return false;
      }
   };

   return (
      <IncomesContext.Provider
         value={{ empty, values, get, create, update, delete: remove }}
      >
         {props.children}
      </IncomesContext.Provider>
   );
};

export const useIncomes = (): Context => React.useContext<Context>(IncomesContext);

export default IncomesProvider;
