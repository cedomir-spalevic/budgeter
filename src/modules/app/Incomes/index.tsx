import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultScreenOptions from "modules/defaultScreenOptions";
import IncomeScreen from "modules/app/Shared/Income";
import DefaultScreen from "./Default";
import IncomesRoutes from "./routes";

const Stack = createStackNavigator();

const IncomesNavigator: React.FC = () => (
   <Stack.Navigator
      initialRouteName={IncomesRoutes.Default}
      screenOptions={defaultScreenOptions(false)}
   >
      <Stack.Screen name={IncomesRoutes.Default} component={DefaultScreen} />
      <Stack.Screen name={IncomesRoutes.Income} component={IncomeScreen} />
   </Stack.Navigator>
);

export default IncomesNavigator;
