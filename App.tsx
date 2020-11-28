import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "context/Auth";
import BudgetsProvider from "context/Budgets";
import PaymentsProvider from "context/Payments";
import SavingsProvider from "context/Savings";
import Entry from "entry";
// Required for react-native-root-toast for react-native >= 0.62
import { RootSiblingParent } from "react-native-root-siblings";

const App: React.FC = () => (
  <NavigationContainer>
    <AuthProvider>
      <BudgetsProvider>
        <PaymentsProvider>
          <SavingsProvider>
            <RootSiblingParent>
              <Entry/>
            </RootSiblingParent>
          </SavingsProvider>
        </PaymentsProvider>
      </BudgetsProvider>
    </AuthProvider>
  </NavigationContainer>
)

export default App;