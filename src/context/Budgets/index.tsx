import { useAuth } from "context";
import React, { useState, createContext, useContext } from "react";
import { Alert } from "react-native";
import { Budget } from "services/external/api/models/data/budget";
import { UnauthorizedError } from "services/external/api/models/errors";
import BudgetsService from "services/external/api/budgets";
import moment from "moment";

interface Props {
   children: React.ReactNode;
}

interface Context {
   title: string;
   value: Budget;
   get: () => Promise<void>;
}

const BudgetContext = createContext<Context>(undefined!);

const BudgetsProvider: React.FC<Props> = (props: Props) => {
   const [title, setTitle] = useState<string>("");
   const [value, setValue] = useState<Budget>({ incomes: [], payments: [] });
   const auth = useAuth();

   const get = async () => {
      try {
         const today = moment();
         const date = today.get("date");
         const month = today.get("month");
         const year = today.get("year");
         const budgetsService = BudgetsService.getInstance();
         const budget = await budgetsService.getBudget(date, month, year);
         console.log(budget)
         setTitle(`${today.format("MMMM")} ${year}`);
         setValue({ ...budget });
      } catch (error) {
         if (error instanceof UnauthorizedError) {
            auth.logout();
            return;
         }
         Alert.alert(
            "Unable to get budget",
            "We're having trouble getting your budget at the moment."
         );
      }
   };

   return (
      <BudgetContext.Provider value={{ title, value, get }}>
         {props.children}
      </BudgetContext.Provider>
   );
};

export const useBudgets = (): Context => useContext<Context>(BudgetContext);

export default BudgetsProvider;
