import { useAuth } from "context";
import React, { useState, createContext, useContext } from "react";
import { Alert } from "react-native";
import { Income } from "services/external/api/models/data/income";
import { UnauthorizedError } from "services/external/api/models/errors";
import IncomesService from "services/external/api/incomes";
import { useBudgets } from "context/Budgets";

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

const IncomesContext = createContext<Context>(undefined!);

const IncomesProvider: React.FC<Props> = (props: Props) => {
   const [empty, setEmpty] = useState<boolean>(false);
   const [count, setCount] = useState<number>(0);
   const [values, setValues] = useState<Income[]>([]);
   const auth = useAuth();
   const budgets = useBudgets();

   const get = async (search?: string, getNext?: boolean) => {
      try {
         if (getNext && values.length === count) return;
         let skip = getNext ? values.length : 0;
         const incomesService = IncomesService.getInstance();
         const incomes = await incomesService.get(10, skip, search);
         setCount(incomes.count);
         if (getNext) setValues([...values, ...incomes.values]);
         else setValues([...incomes.values]);
         setEmpty(!search && incomes.values.length === 0);
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

   const create = async (income: Partial<Income>) => {
      try {
         const incomesService = IncomesService.getInstance();
         const i = await incomesService.create(income);
         const isEmpty = values.length === 0;
         values.push(i);
         setCount(count + 1);
         setValues([...values]);
         if (isEmpty) setEmpty(false);
         // Update budget
         budgets.get();
         return true;
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return false;
         }
         Alert.alert(
            "Unable to create income",
            "We're having trouble creating your new income at the moment."
         );
         return false;
      }
   };

   const update = async (id: string, income: Partial<Income>) => {
      try {
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return;
         const incomesService = IncomesService.getInstance();
         const i = await incomesService.update(id, income);
         values[index] = i;
         setValues([...values]);
         // Update budget
         budgets.get();
         return true;
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return false;
         }
         Alert.alert(
            "Unable to create income",
            "We're having trouble creating your new income at the moment."
         );
         return false;
      }
   };

   const deleteIncome = async (id: string) => {
      try {
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return;
         const incomesService = IncomesService.getInstance();
         await incomesService.delete(id);
         const willBeEmpty = values.length === 1;
         values.splice(index, 1);
         setCount(count - 1);
         setValues([...values]);
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
            "Unable to create income",
            "We're having trouble creating your new income at the moment."
         );
         return false;
      }
   };

   return (
      <IncomesContext.Provider
         value={{ empty, values, get, create, update, delete: deleteIncome }}
      >
         {props.children}
      </IncomesContext.Provider>
   );
};

export const useIncomes = (): Context => useContext<Context>(IncomesContext);

export default IncomesProvider;
