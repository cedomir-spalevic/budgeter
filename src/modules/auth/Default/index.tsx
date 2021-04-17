import React, { useEffect } from "react";
import { View } from "react-native";
import Welcome from "assets/svg/Welcome";
import { Button, Container, Label, Link, Page, Spacer } from "components";
import { useNavigation } from "@react-navigation/native";
import AuthRoutes from "modules/auth/routes";
import { AuthState, makeStyles, useAuth } from "context";
import RNBootSplash from "react-native-bootsplash";

const useStyles = makeStyles(() => ({
   welcomeText: {
      alignItems: "center"
   },
   image: {
      alignItems: "center"
   },
   registerText: {
      paddingTop: 8,
      flexDirection: "row"
   },
   registerLink: {
      paddingLeft: 5
   }
}));

const DefaultScreen: React.FC = () => {
   const navigation = useNavigation();
   const styles = useStyles();
   const auth = useAuth();

   const login = async () => {
      const localLAuthenticationResult = await auth.tryLocalAuthentication();
      if (!localLAuthenticationResult) navigation.navigate(AuthRoutes.Login);
   };

   useEffect(() => {
      if(auth.state == AuthState.Verifying)
         return;
      (async () => {
         await RNBootSplash.hide({ fade: true });
      })();
   }, [auth.state]);

   return (
      <Page>
         <Container flex verticallyCenter>
            <View style={styles.welcomeText}>
               <Label type="header" text="Welcome!" />
               <Label type="shadow" text="Please log in to continue" />
            </View>
            <Spacer />
            <View style={styles.image}>
               <Welcome />
            </View>
            <Spacer />
            <Button size="large" onPress={() => login()} text="Log in" />
            <View style={styles.registerText}>
               <Label type="regular" text="Don't have an account?" />
               <Link
                  onPress={() => navigation.navigate(AuthRoutes.Register)}
                  text="Register Here"
                  style={styles.registerLink}
               />
            </View>
         </Container>
      </Page>
   );
};

export default DefaultScreen;
