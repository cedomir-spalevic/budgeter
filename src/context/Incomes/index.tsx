import { useAuth } from "context";
import React, { useState, createContext, useContext } from "react";
import { Alert } from "react-native";
import { Income } from "services/models/data/income";
import { UnauthorizedError } from "services/models/errors";
import { useBudgets } from "context/Budgets";
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
         const skip = getNext ? values.length : 0;
         const incomes = await getIncomes(10, skip, search);
         setValues([...incomes]);
         // const incomesService = IncomesService.getInstance();
         // const incomes = await incomesService.get(10, skip, search);
         // setCount(incomes.count);
         // if (getNext) setValues([...values, ...incomes.values]);
         // else setValues([...incomes.values]);
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

   const create = async (input: Partial<Income>) => {
      try {
         const income = await createIncome(input);
         //const incomesService = IncomesService.getInstance();
         //const i = await incomesService.create(income);
         const isEmpty = values.length === 0;
         values.push(income);
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

   const update = async (id: string, input: Partial<Income>) => {
      try {
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return false;
         const income = await updateIncome(id, input);
         //const incomesService = IncomesService.getInstance();
         //const i = await incomesService.update(id, income);
         values[index] = income;
         setValues([...values]);
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

   const remove = async (id: string) => {
      try {
         const index = values.findIndex((x) => x.id === id);
         if (index === -1) return false;
         await deleteIncome(id);
         //const incomesService = IncomesService.getInstance();
         //await incomesService.delete(id);
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
         value={{ empty, values, get, create, update, delete: remove }}
      >
         {props.children}
      </IncomesContext.Provider>
   );
};

export const useIncomes = (): Context => useContext<Context>(IncomesContext);

export default IncomesProvider;
