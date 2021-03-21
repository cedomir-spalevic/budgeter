import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultScreenOptions from "modules/defaultScreenOptions";
import ConfirmationCodeScreen from "./ConfirmationCode";
import LoginScreen from "./Default";
import ForgotPasswordScreen from "./ForgotPassword";
import UpdatePasswordScreen from "./UpdatePassword";
import LoginRoutes from "./routes";

const Stack = createStackNavigator();

const LoginNavigator: React.FC = () => (
   <Stack.Navigator
      initialRouteName={LoginRoutes.Default}
      screenOptions={defaultScreenOptions(true)}
   >
      <Stack.Screen name={LoginRoutes.Default} component={LoginScreen} />
      <Stack.Screen
         name={LoginRoutes.ForgotPassword}
         component={ForgotPasswordScreen}
      />
      <Stack.Screen
         name={LoginRoutes.ConfirmationCode}
         component={ConfirmationCodeScreen}
      />
      <Stack.Screen
         name={LoginRoutes.UpdatePassword}
         component={UpdatePasswordScreen}
      />
   </Stack.Navigator>
);

export default LoginNavigator;
