import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { PaymentsRoutes } from "./routes";
import PaymentScreen from "../Shared/Payment";
import { Header } from "components";

const getHeader = (initialRoute: string): StackNavigationOptions => ({
   header: (props) => <Header initialRoute={initialRoute} {...props} />
})

const Stack = createStackNavigator();

const PaymentsNavigator: React.FC = () => {
   return (
      <Stack.Navigator initialRouteName={PaymentsRoutes.Default} screenOptions={getHeader(PaymentsRoutes.Default)} mode="modal">
         <Stack.Screen name={PaymentsRoutes.Default} component={DefaultScreen} />
         <Stack.Screen name={PaymentsRoutes.Payment} component={PaymentScreen} />
      </Stack.Navigator>
   )
}

export default PaymentsNavigator;

