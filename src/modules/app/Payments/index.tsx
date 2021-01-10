import React from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { PaymentsRoutes } from "./routes";
import PaymentScreen from "../Shared/Payment";
import { Header } from "components";

const getHeader = (initialRoute: string, isModal: boolean): StackNavigationOptions => ({
   header: (props) => <Header initialRoute={initialRoute} isModal={isModal} {...props} />
})

const DefaultStack = createStackNavigator();
const ActionsStack = createStackNavigator();
const FormStack = createStackNavigator();

const ActionsNavigator: React.FC = () => (
   <ActionsStack.Navigator mode="card" initialRouteName={PaymentsRoutes.Default} screenOptions={getHeader(PaymentsRoutes.Default, false)}>
      <ActionsStack.Screen name={PaymentsRoutes.Default} component={DefaultScreen} />
   </ActionsStack.Navigator>
)

const FormNavigator: React.FC = () => (
   <FormStack.Navigator initialRouteName={PaymentsRoutes.Payment} screenOptions={getHeader(PaymentsRoutes.Payment, true)}>
      <FormStack.Screen name={PaymentsRoutes.Payment} component={PaymentScreen} />
   </FormStack.Navigator>
)

const DefaultNavigator: React.FC = () => (
   <DefaultStack.Navigator initialRouteName={PaymentsRoutes.Default} screenOptions={{ headerShown: false }} mode="modal">
      <DefaultStack.Screen name={PaymentsRoutes.Default} component={ActionsNavigator} />
      <DefaultStack.Screen name={PaymentsRoutes.Payment} component={FormNavigator} />
   </DefaultStack.Navigator>
)

export default DefaultNavigator;

