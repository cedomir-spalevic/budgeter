import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack"
import ConfirmationCodeScreen from "./ConfirmationCode";
import LoginScreen from "./Default";
import ForgotPasswordScreen from "./ForgotPassword";
import UpdatePasswordScreen from "./UpdatePassword";
import { LoginRoutes } from "./routes";
import { Header } from "components";

const screenOptions: StackNavigationOptions = {
    header: (props) => <Header isModal={true} initialRoute={LoginRoutes.Default} {...props} />
}

const Stack = createStackNavigator();

const LoginNavigator: React.FC = () => (
    <Stack.Navigator initialRouteName={LoginRoutes.Default} screenOptions={screenOptions}>
        <Stack.Screen name={LoginRoutes.Default} component={LoginScreen} options={screenOptions} />
        <Stack.Screen name={LoginRoutes.ForgotPassword} component={ForgotPasswordScreen} />
        <Stack.Screen name={LoginRoutes.ConfirmationCode} component={ConfirmationCodeScreen} />
        <Stack.Screen name={LoginRoutes.UpdatePassword} component={UpdatePasswordScreen} />
    </Stack.Navigator>
)

export default LoginNavigator;