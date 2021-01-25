import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { HomeRoutes } from "./routes";
import { Header } from "components";

const Stack = createStackNavigator();

const IncomesNavigator: React.FC = () => {
   return (
      <Stack.Navigator initialRouteName={HomeRoutes.Default}>
         <Stack.Screen 
            name={HomeRoutes.Default} 
            component={DefaultScreen} 
            options={{
               header: (props) => <Header {...props} />
            }}
         />
      </Stack.Navigator>
   )
}

export default IncomesNavigator;