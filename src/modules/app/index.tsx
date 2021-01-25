import React, { useEffect, useState } from "react";
import HomeNavigator from "./Home";
import IncomesNavigator from "./Incomes";
import PaymentsNavigator from "./Payments";
import SettingsNavigator from "./Settings";
import { useTheme, useIncomes, usePayments, useUser } from "context";
import { Container, Icon, Page, Progress } from "components";
import { BottomTabBarOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

enum TabRoutes {
    Home = "Home",
    Incomes = "Incomes",
    Payments = "Payments",
    Settings = "Settings"
}

const Tab = createBottomTabNavigator();

const getOptions = (name: string) => ({
    tabBarIcon: ({ focused, color, size }) => (
       <Icon name={name} size={size} color={color} />
    )
 })

const TabNavigator: React.FC = () => {
    const theme = useTheme();

    const tabBarOptions: BottomTabBarOptions = {
        style: { backgroundColor: theme.value.palette.tabBarColor },
        inactiveTintColor: theme.value.palette.gray,
        activeTintColor: theme.value.palette.primary,
        showLabel: false,
        keyboardHidesTabBar: true
    }
    return (
        <Tab.Navigator initialRouteName={TabRoutes.Home} tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name={TabRoutes.Home}
                component={HomeNavigator}
                options={getOptions("home")}
            />
            <Tab.Screen
                name={TabRoutes.Payments}
                component={PaymentsNavigator}
                options={getOptions("credit-card")}
            />
            <Tab.Screen
                name={TabRoutes.Incomes}
                component={IncomesNavigator}
                options={getOptions("attach-money")}
            />
            <Tab.Screen
                name={TabRoutes.Settings}
                component={SettingsNavigator}
                options={getOptions("settings")}
            />
        </Tab.Navigator>
    );
}

const App = createStackNavigator();
const AppNavigator: React.FC = () => {
    return (
        <App.Navigator initialRouteName="Tab" screenOptions={{ headerShown: false }}>
            <App.Screen name="Tab" component={TabNavigator} />
        </App.Navigator>
    )
}

const AppLoader: React.FC = () => {
   const [dataLoaded, setDataLoaded] = useState<boolean>(false);
   const user = useUser();
   const incomes = useIncomes();
   const payments = usePayments();

   const load = async () => {
        try {
            /** Any app wide data load should go here */
            await user.getUser();
            await incomes.get();
            await payments.get();
            setDataLoaded(true);
        }
        catch(error) {
            console.log(error);
            setDataLoaded(true);
        }
    }

   useEffect(() => {
        if(!dataLoaded && (user && incomes && payments))  
            load();
   })

   if(!dataLoaded)
      return (
            <Page>
                <Container flex verticallyCenter>
                    <Progress size="large" />
                </Container>
            </Page>
        )
   return <AppNavigator />
}

export default AppLoader;