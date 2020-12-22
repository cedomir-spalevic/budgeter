import React from "react";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "styles";
import PaymentForm from "./PaymentForm";
import { TypingView } from "components";
import { CreditCardPayment } from "assets/svg";
import { useHeaderHeight } from "@react-navigation/stack";

const styles = StyleSheet.create({
   containerSecond: {
      paddingTop: "5%"
   }
})

const PaymentScreen: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
      <TypingView style={[globalStyles.container, styles.containerSecond]} verticalOffset={-headerHeight}>
         <React.Fragment>
            <View style={{ alignItems: "center" }}>
               <CreditCardPayment />
            </View>
            <PaymentForm />
         </React.Fragment>
      </TypingView>
   )
}

export default PaymentScreen;