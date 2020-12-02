import React from "react";
import {
   createStackNavigator
} from "@react-navigation/stack";
import SigninScreen from "./SignIn";
import RegisterScreen from "./Register";
import { AuthRoutes } from "./routes";
import { defaultScreenOptions } from "modules";
import { Icon } from "components";

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainNavigator: React.FC = () => (
   <MainStack.Navigator initialRouteName={AuthRoutes.SignIn} screenOptions={defaultScreenOptions}>
      <MainStack.Screen
         name={AuthRoutes.SignIn}
         component={SigninScreen}
         options={{ headerShown: false }}
      />
   </MainStack.Navigator>
)

const RootNavigator: React.FC = () => (
   <RootStack.Navigator initialRouteName={AuthRoutes.SignIn} mode="modal" screenOptions={defaultScreenOptions}>
      <RootStack.Screen
         name={AuthRoutes.SignIn}
         component={MainNavigator}
         options={{ headerShown: false }}
      />
      <RootStack.Screen
         name={AuthRoutes.Register}
         component={RegisterScreen}
         options={{
            headerBackImage: (color) => (
               <Icon 
                  name="close" 
                  size={32} 
                  style={{ paddingLeft: 20, color: color.tintColor }} 
               />
            )
         }}
      />
   </RootStack.Navigator>
);

export default RootNavigator;