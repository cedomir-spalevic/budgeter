import React from "react";
import {
   createStackNavigator, 
   StackNavigationOptions,
   useHeaderHeight
} from "@react-navigation/stack";
import { AuthRoutes } from "./routes";
import { Icon } from "components";
import LoginScreen from "./Login";
import DefaultScreen from "./Default";
import RegisterScreen from "./Register";
import { colors } from "styles";
import { NavigationHeaderProvider } from "context";

const modalScreenOptions: StackNavigationOptions = {
    headerBackImage: () => (
        <Icon
            name="close"
            size={32}
            style={{ paddingLeft: 20, color: colors.primary }}
        />
    ),
    headerBackTitleVisible: false,
    headerTitle: null,
    headerTransparent: true,
    headerShown: true
}

const LoginStack = createStackNavigator();
const RegisterStack = createStackNavigator();
const DefaultStack = createStackNavigator();

const LoginNavigator: React.FC = () => {
    const headerHeight = useHeaderHeight();
    return (
        <NavigationHeaderProvider headerHeight={headerHeight}>
            <LoginStack.Navigator initialRouteName={AuthRoutes.Login}>
                <LoginStack.Screen name={AuthRoutes.Login} component={LoginScreen} />
            </LoginStack.Navigator>
        </NavigationHeaderProvider>
    )
}

const RegisterNavigator: React.FC = () => {
    const headerHeight = useHeaderHeight();
    return (
        <NavigationHeaderProvider headerHeight={headerHeight}>
            <RegisterStack.Navigator initialRouteName={AuthRoutes.Register}>
                <RegisterStack.Screen
                    name={AuthRoutes.Register}
                    component={RegisterScreen}
                />
            </RegisterStack.Navigator>
        </NavigationHeaderProvider>
    )
}

const DefaultNavigator: React.FC = () => (
    <DefaultStack.Navigator initialRouteName={AuthRoutes.Default} mode="modal">
        <DefaultStack.Screen
            name={AuthRoutes.Default}
            component={DefaultScreen}
            options={{ headerShown: false }}
        />
        <DefaultStack.Screen
            name={AuthRoutes.Login}
            component={LoginNavigator}
            options={modalScreenOptions}
        />
        <DefaultStack.Screen
            name={AuthRoutes.Register}
            component={RegisterNavigator}
            options={modalScreenOptions}
        />
    </DefaultStack.Navigator>
)

export default DefaultNavigator;