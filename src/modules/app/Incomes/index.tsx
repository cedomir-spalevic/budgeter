import React from "react";
import { createStackNavigator, useHeaderHeight } from "@react-navigation/stack";
import DefaultScreen from "./Default";
import { IncomesRoutes } from "./routes";
import { NavigationHeaderProvider } from "context";

const DefaultNavigator: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
       <NavigationHeaderProvider headerHeight={headerHeight}>
          <DefaultScreen />
       </NavigationHeaderProvider>
   )
}

const Stack = createStackNavigator();

const IncomesNavigator: React.FC = () => (
   <Stack.Navigator initialRouteName={IncomesRoutes.Default}>
      <Stack.Screen name={IncomesRoutes.Default} component={DefaultNavigator} options={{ headerTransparent: true, headerTitle: () => null}} />
   </Stack.Navigator>
)

export default IncomesNavigator;