import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthContainer from "context/Auth";
import BudgetsContainer from "context/Budgets";
import PaymentsContainer from "context/Payments";
import SavingsContainer from "context/Savings";
import Entry from "entry";
// Required for react-native-root-toast for react-native >= 0.62
import { RootSiblingParent } from "react-native-root-siblings";

const App: React.FC = () => (
  <NavigationContainer>
    <AuthContainer>
      <BudgetsContainer>
        <PaymentsContainer>
          <SavingsContainer>
            <RootSiblingParent>
              <Entry/>
            </RootSiblingParent>
          </SavingsContainer>
        </PaymentsContainer>
      </BudgetsContainer>
    </AuthContainer>
  </NavigationContainer>
)

export default App;