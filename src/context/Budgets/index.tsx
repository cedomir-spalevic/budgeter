import { useAuth } from "context";
import React, { useState } from "react";
import { Alert } from "react-native";
import { Budget } from "services/models/data/budget";
import { UnauthorizedError } from "services/models/errors";
import moment from "moment";
import { getBudget } from "services/external/graphql/budgets/request";

interface Props {
   children: React.ReactNode;
}

interface Context {
   title: string;
   value: Budget;
   get: () => Promise<void>;
}

const BudgetContext = React.createContext<Context>(undefined!);

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
         const budget = await getBudget(date, month, year);
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

export const useBudgets = (): Context => React.useContext<Context>(BudgetContext);

export default BudgetsProvider;
