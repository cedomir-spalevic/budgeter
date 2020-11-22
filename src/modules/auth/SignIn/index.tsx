import React from "react";
import {
   View,
   StyleSheet
} from "react-native";
import { globalStyles } from "styles";
import Welcome from "styles/images/Welcome";
import SignInForm from "./SignInForm";
import { Label, TypingView } from "components";

const styles = StyleSheet.create({
   welcome: {
      alignItems: "center"
   }
})

const SigninScreen: React.FC = () => {
   return (
      <TypingView style={[globalStyles.container, globalStyles.verticallyCentered]} verticalOffset={-160}>
         <React.Fragment>
            <View style={styles.welcome}>
               <Label text="Welcome!" type="header" />
               <Label text="Please sign in to continue" type="shadow" />
               <Welcome />
            </View>
            <SignInForm />
         </React.Fragment>
      </TypingView>
   )
}

export default SigninScreen;