import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "components/Icon";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "styles";
import BudgetsNavigator from "./Budgets";
import PaymentsNavigator from "./Payments";
import SavingsNavigator from "./Savings";
import ProfileNavigator from "./Profile";
import { useBudgets } from "context/Budgets";
import { usePayments } from "context/Payments";

enum TabRoutes {
   Budgets = "Budgets",
   Payments = "Payments",                    
   Savings = "Savings",
   Profile = "Profile"
}

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
   focusedIcon: {
      color: colors.primary
   },
   regularIcon: {
      color: colors.secondary
   },
   loader: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
   }
})

const tabBarOptions = {
   showLabel: false
}
const getOptions = (name: string) => ({
   tabBarIcon: ({ focused, color, size }) => (
      <Icon name={name} size={24} style={focused ? styles.focusedIcon : styles.regularIcon} />
   )
})

const AppNavigator: React.FC = () => (
   <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
         name={TabRoutes.Budgets}
         component={BudgetsNavigator}
         options={getOptions("home")}
      />
      <Tab.Screen
         name={TabRoutes.Payments}
         component={PaymentsNavigator}
         options={getOptions("payment")}
      />
      {/* <Tab.Screen
         name={TabRoutes.Savings}
         component={SavingsNavigator}
         options={getOptions("attach-money")}
      /> */}
      <Tab.Screen
         name={TabRoutes.Profile}
         component={ProfileNavigator}
         options={getOptions("person")}
      />
   </Tab.Navigator>
);

const AppLoader: React.FC = () => {
   const [dataLoaded, setDataLoaded] = useState<boolean>(false);
   const budgets = useBudgets();
   const payments = usePayments();

   const load = async () => {
      /** Any app wide data load should go here */
      await budgets.getBudgets();
      await payments.getPayments();
      setDataLoaded(true);;
   }

   useEffect(() => {
      load();
   }, [])

   if(!dataLoaded)
      return <View style={styles.loader}><ActivityIndicator size="large" /></View>;
   return <AppNavigator />
}

export default AppLoader;