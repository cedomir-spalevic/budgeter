import React, { useState, createContext, useEffect } from "react";


interface Props {
   children: React.ReactNode;
}

interface Context {
}

const defaultValue: Context = {
}

export const SavingsContext = createContext<Context>(defaultValue);

const SavingsContainer: React.FC<Props> = (props: Props) => {

   return (
      <SavingsContext.Provider value={{}}>
         {props.children}
      </SavingsContext.Provider>
   )
};

export default SavingsContainer;