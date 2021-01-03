import React, { createContext, useContext } from "react";

interface Props {
   children: React.ReactNode;
   headerHeight: number;
}

interface Context {
    headerHeight: number;
}

export const NavigationHeaderContext = createContext<Context>(undefined!);

const NavigationHeaderProvider: React.FC<Props & any> = (props: Props) => {
   return (
      <NavigationHeaderContext.Provider value={{ headerHeight: props.headerHeight }}>
         {props.children}
      </NavigationHeaderContext.Provider>
   )
};

export const useNavigationHeader = (): Context => useContext<Context>(NavigationHeaderContext);

export default NavigationHeaderProvider;