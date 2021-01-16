import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, ScrollProvider, ThemeProvider } from "context";
import Entry from "Entry";
// Required for react-native-root-toast for react-native >= 0.62
import { RootSiblingParent } from "react-native-root-siblings";

const Root: React.FC = () => (
  <NavigationContainer>
    <AuthProvider>
      <ThemeProvider>
        <RootSiblingParent>
          <ScrollProvider>
            <Entry />
          </ScrollProvider>
        </RootSiblingParent>
      </ThemeProvider>
    </AuthProvider>
  </NavigationContainer>
)

export default Root;