import React from "react";
import {
   createStackNavigator, 
   StackNavigationOptions
} from "@react-navigation/stack";
import { AuthRoutes } from "./routes";
import LoginScreen from "./Login";
import DefaultScreen from "./Default";
import RegisterScreen from "./Register";
import ForgotPasswordScreen from "./ForgotPassword";
import { Header } from "components";

const getHeader = (initialRoute: string): StackNavigationOptions => ({
    header: (props) => <Header isModal={true} initialRoute={initialRoute} {...props} />
})

const LoginStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const DefaultStack = createStackNavigator();

const LoginNavigator: React.FC = () => (
    <LoginStack.Navigator initialRouteName={AuthRoutes.Login} screenOptions={getHeader(AuthRoutes.Login)}>
        <LoginStack.Screen name={AuthRoutes.Login} component={LoginScreen} />
        <LoginStack.Screen name={AuthRoutes.ForgotPassword} component={ForgotPasswordScreen} />
    </LoginStack.Navigator>
)

const RegisterNavigator: React.FC = () => (
    <RegisterStack.Navigator initialRouteName={AuthRoutes.Register} screenOptions={getHeader(AuthRoutes.Register)}>
        <RegisterStack.Screen name={AuthRoutes.Register} component={RegisterScreen} />
    </RegisterStack.Navigator>
)

const DefaultNavigator: React.FC = () => (
    <DefaultStack.Navigator initialRouteName={AuthRoutes.Default} mode="modal" screenOptions={{ headerShown: false }}>
        <DefaultStack.Screen
            name={AuthRoutes.Default}
            component={DefaultScreen}
        />
        <DefaultStack.Screen
            name={AuthRoutes.Login}
            component={LoginNavigator}
        />
        <DefaultStack.Screen
            name={AuthRoutes.Register}
            component={RegisterNavigator}
        />
    </DefaultStack.Navigator>
)

export default DefaultNavigator;