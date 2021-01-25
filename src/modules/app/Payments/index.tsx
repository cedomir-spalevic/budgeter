import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import PaymentScreen from "modules/app/Shared/Payment";
import { PaymentsRoutes } from "./routes";
import { Header } from "components";

const Stack = createStackNavigator();

const PaymentsNavigator: React.FC = () => {
   return (
      <Stack.Navigator initialRouteName={PaymentsRoutes.Default} mode="modal">
         <Stack.Screen 
            name={PaymentsRoutes.Default} 
            component={DefaultScreen} 
            options={{
               header: (props) => <Header {...props} />
            }}
         />
         <Stack.Screen 
            name={PaymentsRoutes.Payment} 
            component={PaymentScreen} 
            options={{
               header: (props) => <Header isModal={true} {...props} />
            }}
         />
      </Stack.Navigator>
   )
}

export default PaymentsNavigator;