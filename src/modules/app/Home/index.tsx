import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { HomeRoutes } from "./routes";
import { Header } from "components";
import BudgetIncomesList from "./BudgetIncomesList";
import BudgetPaymentsList from "./BudgetPaymentsList";
import BudgetDueTodayList from "./BudgetDueTodayList";
import IncomeScreen from "../Shared/Income";
import PaymentScreen from "../Shared/Payment";

const screenOptions: StackNavigationOptions = {
   header: (props) => <Header {...props} />
}

const Stack = createStackNavigator();

const IncomesNavigator: React.FC = () => {
   return (
      <Stack.Navigator initialRouteName={HomeRoutes.Default} screenOptions={screenOptions}>
         <Stack.Screen 
            name={HomeRoutes.Default} 
            component={DefaultScreen}
         />
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
         <Stack.Screen
            name={HomeRoutes.Income}
            component={IncomeScreen}
         />
         <Stack.Screen
            name={HomeRoutes.Payment}
            component={PaymentScreen}
         />
      </Stack.Navigator>
   )
}

export default IncomesNavigator;