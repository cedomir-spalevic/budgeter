import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthRoutes from "./routes";
import DefaultScreen from "./Default";
import LoginNavigator from "./Login";
import RegisterNavigator from "./Register";

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => (
   <Stack.Navigator
      initialRouteName={AuthRoutes.Default}
      mode="modal"
      screenOptions={{ headerShown: false }}
   >
      <Stack.Screen name={AuthRoutes.Default} component={DefaultScreen} />
      <Stack.Screen name={AuthRoutes.Login} component={LoginNavigator} />
      <Stack.Screen name={AuthRoutes.Register} component={RegisterNavigator} />
   </Stack.Navigator>
);

export default AuthNavigator;
