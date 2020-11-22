import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Home";
import BudgetScreen from "modules/app/Shared/Budget";
import BudgetPaymentsScreen from "./BudgetPayments";
import NewBudgetPaymentScreen from "./NewBudgetPayment";
import { BudgetsRoute } from "./routes";
import PaymentScreen from "modules/app/Shared/Payment";
import AddExistingPayments from "./AddExistingPayments";
import { defaultScreenOptions } from "modules";

const Stack = createStackNavigator();

const BudgetsNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={BudgetsRoute.Home} screenOptions={defaultScreenOptions}>
      <Stack.Screen name={BudgetsRoute.Home} component={HomeScreen} />
      <Stack.Screen name={BudgetsRoute.Budget} component={BudgetScreen} />
      <Stack.Screen name={BudgetsRoute.BudgetPayments} component={BudgetPaymentsScreen} />
      <Stack.Screen name={BudgetsRoute.AddPayment} component={NewBudgetPaymentScreen} />
      <Stack.Screen name={BudgetsRoute.NewPayment} component={PaymentScreen} />
      <Stack.Screen name={BudgetsRoute.AddExistingPayments} component={AddExistingPayments} />
   </Stack.Navigator>
)

export default BudgetsNavigator;