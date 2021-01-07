import React from "react";
import { createStackNavigator, StackHeaderTitleProps, StackNavigationOptions, useHeaderHeight } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import IncomeScreen from "modules/app/Shared/Income";
import { IncomesRoutes } from "./routes";
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

const IncomeNavigator: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
      <NavigationHeaderProvider headerHeight={headerHeight}>
         <IncomeScreen />
      </NavigationHeaderProvider>
   )
}

const Stack = createStackNavigator();

const IncomesNavigator: React.FC = () => {
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
      <Stack.Navigator initialRouteName={IncomesRoutes.Default} screenOptions={options} mode="modal">
         <Stack.Screen name={IncomesRoutes.Default} component={DefaultNavigator} />
         <Stack.Screen name={IncomesRoutes.Income} component={IncomeNavigator} />
      </Stack.Navigator>
   )
}

export default IncomesNavigator;