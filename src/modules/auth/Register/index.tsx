import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack"
import ConfirmationCodeScreen from "./ConfirmationCode";
import LoginScreen from "./Default";
import { RegisterRoutes } from "./routes";
import { Header } from "components";

const screenOptions: StackNavigationOptions = {
    header: (props) => <Header isModal={true} {...props} />
}

const Stack = createStackNavigator();

const RegisterNavigator: React.FC = () => (
    <Stack.Navigator initialRouteName={RegisterRoutes.Default} screenOptions={screenOptions}>
        <Stack.Screen name={RegisterRoutes.Default} component={LoginScreen} />
        <Stack.Screen name={RegisterRoutes.ConfirmationCode} component={ConfirmationCodeScreen} />
    </Stack.Navigator>
)

export default RegisterNavigator;