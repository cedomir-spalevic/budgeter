import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import defaultScreenOptions from "modules/defaultScreenOptions";
import DefaultScreen from "./Default";
import HomeRoutes from "./routes";
import BudgetIncomesList from "./BudgetIncomesList";
import BudgetPaymentsList from "./BudgetPaymentsList";
import BudgetDueTodayList from "./BudgetDueTodayList";
import IncomeScreen from "../Shared/Income";
import PaymentScreen from "../Shared/Payment";

const Stack = createStackNavigator();

const IncomesNavigator: React.FC = () => (
   <Stack.Navigator
      initialRouteName={HomeRoutes.Default}
      screenOptions={defaultScreenOptions(false)}
   >
      <Stack.Screen name={HomeRoutes.Default} component={DefaultScreen} />
      <Stack.Screen
         name={HomeRoutes.BudgetIncomesList}
         component={BudgetIncomesList}
      />
      <Stack.Screen
         name={HomeRoutes.BudgetPaymentsList}
         component={BudgetPaymentsList}
      />
      <Stack.Screen
         name={HomeRoutes.BudgetDueTodayList}
         component={BudgetDueTodayList}
      />
      <Stack.Screen name={HomeRoutes.Income} component={IncomeScreen} />
      <Stack.Screen name={HomeRoutes.Payment} component={PaymentScreen} />
   </Stack.Navigator>
);

export default IncomesNavigator;
