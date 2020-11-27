import React, { createContext } from "react";
import { Context, useBudgets, defaultValue } from "./context";

interface Props {
   children: React.ReactNode;
}

const BudgetsContext = createContext<Context>(defaultValue);

const BudgetsProvider: React.FC<Props> = (props: Props) => {
   const budgets = useBudgets();

   return (
      <BudgetsContext.Provider value={budgets}>
         {props.children}
      </BudgetsContext.Provider>
   )
};

export default BudgetsProvider;