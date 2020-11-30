import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "context/Auth";
import Entry from "Entry";
// Required for react-native-root-toast for react-native >= 0.62
import { RootSiblingParent } from "react-native-root-siblings";

const Root: React.FC = () => (
  <NavigationContainer>
    <AuthProvider>
        <RootSiblingParent>
            <Entry/>
        </RootSiblingParent>
    </AuthProvider>
  </NavigationContainer>
)

export default Root;