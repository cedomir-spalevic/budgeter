import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Page } from "components";
import { AuthState, makeStyles, useAuth } from "context";
import { Finance } from "assets/svg";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "../routes";

const useStyles = makeStyles(palette => ({
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
}))

const SplashScreen: React.FC = () => {
    const auth = useAuth();
    const styles = useStyles();
    const navigation = useNavigation();
    const [width, setWidth] = useState<number>();

    useEffect(() => {
        if(auth.state === AuthState.SignedOut)
            navigation.navigate(AuthRoutes.Default)
    }, [auth.state])

    return (
        <Page>
            <View onLayout={e => !width && setWidth(e.nativeEvent.layout.width)} style={styles.image}>
                {width && <Finance width={width*.9} />}
            </View>
        </Page>
    )
}

export default SplashScreen;