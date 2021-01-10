import { StackHeaderProps } from "@react-navigation/stack";
import { makeStyles, useTheme } from "context";
import React, { useEffect, useState } from "react";
import {
    View
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
    modalHasParentInStack?: boolean;
    initialRoute: string;
}

const Header: React.FC<Props & StackHeaderProps> = (props: Props & StackHeaderProps) => {
    const [showBackButton, setShowBackButton] = useState<boolean>(false);
    const styles = useStyles();
    const theme = useTheme();

    const closeModal = () => {
        if(props.modalHasParentInStack)
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

    const headerLeft = props.scene.descriptor.options.headerLeft;
    const leftActions = headerLeft && headerLeft({ tintColor: theme.value.palette.primary });
    const headerRight = props.scene.descriptor.options.headerRight;
    const rightActions = headerRight && headerRight({ tintColor: theme.value.palette.primary });

    return (
        <View style={styles.header}>
            <View style={styles.actions}>
                {showBackButton &&
                    <Icon name="chevron-left" size={32} color={theme.value.palette.primary} onPress={() => goBack()} />}
                {leftActions}
            </View>
            <View style={styles.actions}>
                {rightActions}
                {props.isModal &&
                    <Icon name="close" size={32} color={theme.value.palette.primary} onPress={() => closeModal()}  />}
            </View>
        </View>
    )
}

export default Header;