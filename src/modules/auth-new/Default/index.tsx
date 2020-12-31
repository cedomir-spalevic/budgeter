import React from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";
import { colors, globalStyles } from "styles";
import Welcome from "assets/svg/Welcome";
import { Button, Label, Page } from "components-new";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "modules/auth-new/routes";

const styles = StyleSheet.create({
    content: {
       width: Dimensions.get("screen").width * 0.8
    },
    welcomeText: {
        alignItems: "center"
    },
    image: {
        alignItems: "center",
        paddingVertical: 15
    },
    registerText: {
        paddingTop: 8,
        flexDirection: "row"
    },
    registerLink: {
        paddingLeft: 5
    }
 })

const DefaultScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        <Page verticallyCenter>
            <View style={styles.content}>
                <View style={styles.welcomeText}>
                    <Label type="header" text="Welcome!" />
                    <Label type="shadow" text="Please log in to continue" />
                </View>
                <View style={styles.image}>
                    <Welcome />
                </View>
                <Button onPress={() => navigation.navigate(AuthRoutes.Login)} text="Log in" />
                <View style={styles.registerText}>
                    <Label type="subText" text="Don't have an account?" />
                    <TouchableOpacity onPress={() => navigation.navigate(AuthRoutes.Register)} style={styles.registerLink}>
                        <Label type="subText" text="Register here" color={colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </Page>
    )
}

export default DefaultScreen;