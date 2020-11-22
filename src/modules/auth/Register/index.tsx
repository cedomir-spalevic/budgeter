import React from "react";
import { View, StyleSheet } from "react-native";
import { globalStyles } from "styles";
import RegisterForm from "./RegisterForm";
import PressPlay from "styles/images/PressPlay";
import { TypingView } from "components";
import { useHeaderHeight } from "@react-navigation/stack";

const styles = StyleSheet.create({
   containerSecond: {
      paddingTop: "5%"
   }
})

const RegisterScreen: React.FC = () => {
   const headerHeight = useHeaderHeight();
   return (
      <TypingView style={[globalStyles.container, styles.containerSecond]} verticalOffset={-headerHeight}>
         <React.Fragment>
            <View style={{ alignItems: "center" }}>
               <PressPlay />
            </View>
            <RegisterForm />
         </React.Fragment>
      </TypingView>
   )
}

export default RegisterScreen;