import React, { createContext } from "react";
import { Context, defaultValue, usePayments } from "./context";

interface Props {
   children: React.ReactNode;
}

const PaymentsContext = createContext<Context>(defaultValue);

const PaymentsProvider: React.FC<Props> = (props: Props) => {
   const payments = usePayments();

   return (
      <PaymentsContext.Provider value={payments}>
         {props.children}
      </PaymentsContext.Provider>
   )
};

export default PaymentsProvider;