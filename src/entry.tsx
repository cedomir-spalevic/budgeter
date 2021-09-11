import React from "react";
import AuthNavigator from "modules/auth";
import AppLoader from "modules/app";
import {
   AuthState,
   useAuth,
   UserProvider,
   BudgetsProvider,
   NotificationsProvider
} from "context";
import PaymentsProvider from "context/Payments";
import IncomesProvider from "context/Incomes";

const Entry: React.FC = () => {
   const auth = useAuth();

   switch (auth.state) {
      case AuthState.SignedIn:
         return (
            <UserProvider>
               <BudgetsProvider>
                  <IncomesProvider>
                     <PaymentsProvider>
                        <NotificationsProvider>
                           <AppLoader />
                        </NotificationsProvider>
                     </PaymentsProvider>
                  </IncomesProvider>
               </BudgetsProvider>
            </UserProvider>
         );
      default:
         return <AuthNavigator />;
   }
};
export default Entry;
