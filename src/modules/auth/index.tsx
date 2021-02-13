import React from "react";
import { AuthRoutes } from "./routes";
import DefaultScreen from "./Default";
import LoginNavigator from "./Login";
import RegisterNavigator from "./Register";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./Splash";
import { AuthState, useAuth } from "context";

const Stack = createStackNavigator();

const AuthNavigator: React.FC = () => {
    const auth = useAuth();
    return (
        <Stack.Navigator initialRouteName={auth.state === AuthState.SignedOut ? AuthRoutes.Default : AuthRoutes.Splash} mode="modal" screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={AuthRoutes.Default}
                component={DefaultScreen}
            />
            <Stack.Screen
                name={AuthRoutes.Login}
                component={LoginNavigator}
            />
            <Stack.Screen
                name={AuthRoutes.Register}
                component={RegisterNavigator}
            />
            <Stack.Screen
                name={AuthRoutes.Splash}
                component={SplashScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator;