import { StackHeaderProps } from "@react-navigation/stack";
import { makeStyles, useTheme, useHeaderOptions } from "context";
import React, { useEffect, useState } from "react";
import {
    View,
    Dimensions
} from "react-native";
import { Icon } from "components";

const useStyles = makeStyles(theme => ({
    header: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: theme.size.pagePadding,
        backgroundColor: theme.palette.secondary
    },
    actions: {
        paddingTop: 50
    }
}))

interface Props {
    isModal?: boolean;
    initialRoute: string;
}

const Header: React.FC<Props & StackHeaderProps> = (props: Props & StackHeaderProps) => {
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const styles = useStyles();
    const theme = useTheme();
    const headerOptions = useHeaderOptions();

    const closeModal = () => {
        props.navigation.popToTop();
        if(props.navigation.canGoBack())
            props.navigation.goBack();
    }

    const goBack = () => {
        if(props.previous && props.previous.route.name === props.initialRoute)
            setShowBackButton(false);
        props.navigation.goBack();
    }

    useEffect(() => {
        setShowBackButton(props.scene.route.name !== props.initialRoute);
    }, [props.scene.route.name])

    return (
        <View style={styles.header}>
            <View style={styles.actions}>
                {showBackButton &&
                    <Icon name="chevron-left" size={32} color={theme.value.palette.primary} onPress={() => goBack()} />}
            </View>
            <View style={styles.actions}>
                {headerOptions.options && headerOptions.options.rightActions}
                {props.isModal &&
                    <Icon name="close" size={32} color={theme.value.palette.primary} onPress={() => closeModal()}  />}
            </View>
        </View>
    )
}

export default Header;