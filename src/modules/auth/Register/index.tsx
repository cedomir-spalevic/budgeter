import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultScreenOptions from "modules/defaultScreenOptions";
import ConfirmationCodeScreen from "./ConfirmationCode";
import LoginScreen from "./Default";
import RegisterRoutes from "./routes";

const Stack = createStackNavigator();

const RegisterNavigator: React.FC = () => (
   <Stack.Navigator
      initialRouteName={RegisterRoutes.Default}
      screenOptions={defaultScreenOptions(true)}
   >
      <Stack.Screen name={RegisterRoutes.Default} component={LoginScreen} />
      <Stack.Screen
         name={RegisterRoutes.ConfirmationCode}
         component={ConfirmationCodeScreen}
      />
   </Stack.Navigator>
);

export default RegisterNavigator;
