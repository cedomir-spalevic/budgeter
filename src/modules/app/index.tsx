import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "components/Icon";
import { StyleSheet } from "react-native";
import { colors } from "styles";
import BudgetsNavigator from "./Budgets";
import PaymentsNavigator from "./Payments";
import SavingsNavigator from "./Savings";
import ProfileNavigator from "./Profile";

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

const TabNavigator: React.FC = () => (
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

export default TabNavigator;