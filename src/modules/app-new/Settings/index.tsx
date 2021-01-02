import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { SettingsRoutes } from "./routes";

const Stack = createStackNavigator();

const SettingsNavigaor: React.FC = () => (
   <Stack.Navigator initialRouteName={SettingsRoutes.Default}>
      <Stack.Screen name={SettingsRoutes.Default} component={DefaultScreen} />
   </Stack.Navigator>
)

export default SettingsNavigaor;