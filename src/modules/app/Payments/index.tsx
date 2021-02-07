import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import PaymentScreen from "modules/app/Shared/Payment";
import { PaymentsRoutes } from "./routes";
import { Header } from "components";

const screenOptions: StackNavigationOptions = {
   header: (props) => <Header {...props} />
}

const Stack = createStackNavigator();

const PaymentsNavigator: React.FC = () => {
   return (
      <Stack.Navigator initialRouteName={PaymentsRoutes.Default} screenOptions={screenOptions}>
         <Stack.Screen 
            name={PaymentsRoutes.Default} 
            component={DefaultScreen}
         />
         <Stack.Screen 
            name={PaymentsRoutes.Payment} 
            component={PaymentScreen}
         />
      </Stack.Navigator>
   )
}

export default PaymentsNavigator;