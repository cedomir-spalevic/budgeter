import React from "react";
import { createStackNavigator, StackHeaderTitleProps, StackNavigationOptions, useHeaderHeight } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { PaymentsRoutes } from "./routes";
import { NavigationHeaderProvider, useTheme } from "context";
import { Dimensions } from "react-native";
import PaymentScreen from "../Shared/Payment";

const DefaultNavigator: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
       <NavigationHeaderProvider headerHeight={headerHeight}>
          <DefaultScreen />
       </NavigationHeaderProvider>
   )
}

const PaymentNavigator: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
      <NavigationHeaderProvider headerHeight={headerHeight}>
         <PaymentScreen />
      </NavigationHeaderProvider>
   )
}

const Stack = createStackNavigator();

const PaymentsNavigator: React.FC = () => {
   const theme = useTheme();

   const options: StackNavigationOptions = {
      headerTintColor: theme.pallette.primary,
      headerTransparent: true,
      headerTitle: (props: StackHeaderTitleProps) => null,
      headerLeftContainerStyle: { paddingLeft: Dimensions.get("screen").width * 0.1 },
      headerRightContainerStyle: { paddingRight: Dimensions.get("screen").width * 0.1 },
      headerBackTitleVisible: false
   }
   return (
      <Stack.Navigator initialRouteName={PaymentsRoutes.Default} screenOptions={options} mode="modal">
         <Stack.Screen name={PaymentsRoutes.Default} component={DefaultNavigator} />
         <Stack.Screen name={PaymentsRoutes.Payment} component={PaymentNavigator} />
      </Stack.Navigator>
   )
}

export default PaymentsNavigator;