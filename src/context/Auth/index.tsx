import React, { createContext } from "react";
import { Context, defaultValue, useAuth } from "./context";

interface Props {
   children: React.ReactNode;
}

const AuthContext = createContext<Context>(defaultValue);

const AuthProvider: React.FC<Props> = (props: Props) => {
   const auth = useAuth();

   return (
      <AuthContext.Provider value={auth}>
         {props.children}
      </AuthContext.Provider>
   )
};

export default AuthProvider;