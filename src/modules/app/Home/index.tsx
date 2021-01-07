import React from "react";
import { createStackNavigator, StackHeaderTitleProps, StackNavigationOptions, useHeaderHeight } from "@react-navigation/stack";
import { HomeRoutes } from "./routes";
import DefaultScreen from "./Default";
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

const BudgetsNavigator: React.FC = () => {
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
      <Stack.Navigator initialRouteName={HomeRoutes.Default} screenOptions={options}>
         <Stack.Screen name={HomeRoutes.Default} component={DefaultNavigator} />
      </Stack.Navigator>
   )
}

export default BudgetsNavigator;