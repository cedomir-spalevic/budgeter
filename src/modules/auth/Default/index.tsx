import React from "react";
import { View } from "react-native";
import Welcome from "assets/svg/Welcome";
import { Button, Container, Label, Link, Page, Spacer } from "components";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "modules/auth/routes";
import { makeStyles, useAuth } from "context";

const useStyles = makeStyles(palette => ({
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
}))

const DefaultScreen: React.FC = () => {
    const navigation = useNavigation();
    const styles = useStyles();
    const auth = useAuth();

    const login = async () => {
        const localLAuthenticationResult = await auth.tryLocalAuthentication();
        if(!localLAuthenticationResult)
            navigation.navigate(AuthRoutes.Login);
    }

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
    )
}

export default DefaultScreen;