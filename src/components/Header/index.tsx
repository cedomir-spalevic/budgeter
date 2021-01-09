import { StackHeaderProps } from "@react-navigation/stack";
import { makeStyles, useTheme } from "context";
import React from "react";
import {
    View,
    Dimensions
} from "react-native";
import { Icon } from "components";

const useStyles = makeStyles(palette => ({
    header: {
        paddingTop: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: Dimensions.get("screen").width*.1,
        backgroundColor: palette.secondary
    }
}))

interface Props {
    isModal?: boolean;
    initialRoute: string;
}

const Header: React.FC<Props & StackHeaderProps> = (props: Props & StackHeaderProps) => {
    const styles = useStyles();
    const theme = useTheme();

    const closeModal = () => {
        props.navigation.popToTop();
        if(props.navigation.canGoBack())
            props.navigation.goBack();
    }

    return (
        <View style={styles.header}>
            <View>
                {props.initialRoute !== props.scene.route.name &&
                    <Icon name="chevron-left" size={32} color={theme.pallette.primary} onPress={() => props.navigation.goBack()} />}
            </View>
            <View>
                {props.isModal &&
                    <Icon name="close" size={32} color={theme.pallette.primary} onPress={() => closeModal()}  />}
            </View>
        </View>
    )
}

export default Header;