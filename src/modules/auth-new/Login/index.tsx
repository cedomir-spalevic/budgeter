import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { Page } from "components-new";
import { globalStyles } from "styles";

const LoginScreen: React.FC = () => {
    return (
        <Page modal>
            <Text>Login</Text>
        </Page>
    )
}

export default LoginScreen;