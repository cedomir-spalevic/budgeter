import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { HomeRoutes } from "./routes";
import { Header } from "components";

const screenOptions: StackNavigationOptions = {
   header: (props) => <Header {...props} />
}

const Stack = createStackNavigator();

const IncomesNavigator: React.FC = () => {
   return (
      <Stack.Navigator initialRouteName={HomeRoutes.Default} screenOptions={screenOptions}>
         <Stack.Screen 
            name={HomeRoutes.Default} 
            component={DefaultScreen}
         />
      </Stack.Navigator>
   )
}

export default IncomesNavigator;