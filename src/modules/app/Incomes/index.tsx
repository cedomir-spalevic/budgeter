import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import IncomeScreen from "modules/app/Shared/Income";
import { IncomesRoutes } from "./routes";
import { Header } from "components";

const screenOptions: StackNavigationOptions = {
   header: (props) => <Header {...props} />
}

const Stack = createStackNavigator();

const IncomesNavigator: React.FC = () => {
   return (
      <Stack.Navigator initialRouteName={IncomesRoutes.Default} screenOptions={screenOptions}>
         <Stack.Screen 
            name={IncomesRoutes.Default} 
            component={DefaultScreen}
         />
         <Stack.Screen 
            name={IncomesRoutes.Income} 
            component={IncomeScreen}
         />
      </Stack.Navigator>
   )
}

export default IncomesNavigator;