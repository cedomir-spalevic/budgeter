import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "components/Icon";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "styles";
import HomeNavigator from "./Home";
import IncomesNavigator from "./Incomes";
import PaymentsNavigator from "./Payments";
import SettingsNavigator from "./Settings";
import { makeStyles, useTheme } from "context-new";
import { Page } from "components-new";

enum TabRoutes {
    Home = "Home",
    Incomes = "Incomes",
    Payments = "Payments",
    Settings = "Settings"
}

const Tab = createMaterialBottomTabNavigator();

const useStyles = makeStyles(palette => ({
    focusedIcon: {
        color: palette.primary
    },
    regularIcon: {
        color: palette.gray
    }
}))

const AppNavigator: React.FC = () => {
    const styles = useStyles();
    const theme = useTheme();

    return (
        <Tab.Navigator b tabBarOptions={{ showLabel: false }}>
            <Tab.Screen
                name={TabRoutes.Home}
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="home"
                            size={24}
                            style={focused ? styles.focusedIcon : styles.regularIcon}
                        />
                    )
                }}
            />
            <Tab.Screen
                name={TabRoutes.Payments}
                component={PaymentsNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="home"
                            size={24}
                            style={focused ? styles.focusedIcon : styles.regularIcon}
                        />
                    )
                }}
            />
            <Tab.Screen
                name={TabRoutes.Incomes}
                component={IncomesNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="home"
                            size={24}
                            style={focused ? styles.focusedIcon : styles.regularIcon}
                        />
                    )
                }}
            />
            <Tab.Screen
                name={TabRoutes.Settings}
                component={SettingsNavigator}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Icon
                            name="settings"
                            size={24}
                            style={focused ? styles.focusedIcon : styles.regularIcon}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const AppLoader: React.FC = () => {
   const [dataLoaded, setDataLoaded] = useState<boolean>(false);
//    const budgets = useBudgets();
//    const payments = usePayments();

   const load = async () => {
      /** Any app wide data load should go here */
    //   await budgets.getBudgets();
    //   await payments.getPayments();
      setTimeout(() => {
        setDataLoaded(true);
      }, 2000)
   }

   useEffect(() => {
      load();
   }, [])

   if(!dataLoaded)
      return <Page><ActivityIndicator size="large" /></Page>;
   return <AppNavigator />
}

export default AppLoader;