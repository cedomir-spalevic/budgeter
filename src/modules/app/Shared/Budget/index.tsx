import React from "react";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "styles";
import BudgetForm from "./BudgetForm";
import { TypingView } from "components";
import { Finance } from "styles/images";
import { useHeaderHeight } from "@react-navigation/stack";

const styles = StyleSheet.create({
   containerSecond: {
      paddingTop: "5%"
   }
})

const BudgetScreen: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
      <TypingView style={[globalStyles.container, styles.containerSecond]} verticalOffset={-headerHeight}>
         <React.Fragment>
            <View style={{ alignItems: "center" }}>
               <Finance width={300} />
            </View>
            <BudgetForm />
         </React.Fragment>
      </TypingView>
   )
}

export default BudgetScreen;