import { StackScreenProps } from "@react-navigation/stack";
import React, { useState, createContext, useEffect, useContext } from "react";


interface Props {
   children: React.ReactNode;
   headerHeight: number;
}

interface Context {
    headerHeight: number;
}

export const ModalContext = createContext<Context>(undefined!);

const ModalProvider: React.FC<Props & any> = (props: Props) => {
   return (
      <ModalContext.Provider value={{ headerHeight: props.headerHeight }}>
         {props.children}
      </ModalContext.Provider>
   )
};

export const useModal = (): Context => useContext<Context>(ModalContext);

export default ModalProvider;