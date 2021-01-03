import React from "react";
import { createStackNavigator, StackHeaderTitleProps, StackNavigationOptions, useHeaderHeight } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { PaymentsRoutes } from "./routes";
import { NavigationHeaderProvider, useTheme } from "context";
import { Dimensions } from "react-native";

const DefaultNavigator: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
       <NavigationHeaderProvider headerHeight={headerHeight}>
          <DefaultScreen />
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
      <Stack.Navigator initialRouteName={PaymentsRoutes.Default} screenOptions={options}>
         <Stack.Screen name={PaymentsRoutes.Default} component={DefaultNavigator} />
      </Stack.Navigator>
   )
}

export default PaymentsNavigator;