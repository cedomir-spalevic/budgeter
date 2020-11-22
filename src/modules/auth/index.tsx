import React from "react";
import {
   createStackNavigator
} from "@react-navigation/stack";
import SigninScreen from "./SignIn";
import RegisterScreen from "./Register";
import { AuthRoutes } from "./routes";
import { defaultScreenOptions } from "modules";

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={AuthRoutes.SignIn} mode="modal" screenOptions={defaultScreenOptions}>
      <Stack.Screen
         name={AuthRoutes.SignIn}
         component={SigninScreen}
      />
      <Stack.Screen
         name={AuthRoutes.Register}
         component={RegisterScreen}
      />
   </Stack.Navigator>
);

export default AuthNavigator;