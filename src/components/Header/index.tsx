import { 
    StackNavigationProp, 
    StackHeaderStyleInterpolator
} from "@react-navigation/stack";
import { makeStyles, useTheme } from "context";
import React from "react";
import {
    Animated,
    StyleProp,
    View,
    ViewStyle
} from "react-native";
import { Icon } from "components";
import { NavigationProp, ParamListBase, Route, StackNavigationState } from "@react-navigation/native";
import { Layout, StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
import { EdgeInsets } from "react-native-safe-area-context";

interface ExtraNavigationProps {
    containerBackground?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
}

type StackDescriptor = {
    render(): JSX.Element;
    options: ExtraNavigationProps & StackNavigationOptions;
    navigation: NavigationProp<Record<string, object>, string, StackNavigationState, StackNavigationOptions, {}>;
}

type Scene<T> = {
    route: T;
    descriptor: StackDescriptor;
    progress: {
        current: Animated.AnimatedInterpolation;
        next?: Animated.AnimatedInterpolation;
        previous?: Animated.AnimatedInterpolation;
    };
}

type StackHeaderProps = {
    mode: "float" | "screen";
    layout: Layout;
    insets: EdgeInsets;
    scene: Scene<Route<string>>;
    previous?: Scene<Route<string>>;
    navigation: StackNavigationProp<ParamListBase>;
    styleInterpolator: StackHeaderStyleInterpolator;
}

const useStyles = makeStyles(theme => ({
    container: {
        position: "relative",
        height: 100,
        backgroundColor: theme.palette.secondary
    },
    containerBackground: {
        position: "absolute", 
        height: "100%", 
        width: "100%", 
        backgroundColor: theme.palette.white,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgba(0,0,0,0.4)",
        opacity: 0
    },
    header: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: theme.size.pagePadding
    },
    animationTitle: {
        paddingTop: 50,
        position: "relative",
        width: 150,
        overflow: "hidden",
        marginTop: 30
    },
    actions: {
        paddingTop: 50
    }
}))

interface Props {
    isModal?: boolean;
}

const Header: React.FC<Props & StackHeaderProps> = (props: Props & StackHeaderProps) => {
    const styles = useStyles();
    const theme = useTheme();
    const showBackBtn = props.navigation.dangerouslyGetState().index > 0;
    const headerTitle = props.scene.descriptor.options.headerTitle;
    const headerTitleNode = headerTitle && typeof(headerTitle) === "function" && headerTitle({ onLayout: () => {} });
    const headerLeft = props.scene.descriptor.options.headerLeft;
    const leftActions = headerLeft && headerLeft({ tintColor: theme.value.palette.primary });
    const headerRight = props.scene.descriptor.options.headerRight;
    const rightActions = headerRight && headerRight({ tintColor: theme.value.palette.primary });
    const extraContainerBackgroundStyle = props.scene.descriptor.options.containerBackground;
    const containerBackgroundStyles = [styles.containerBackground, extraContainerBackgroundStyle];

    const closeModal = () => {
        if(showBackBtn)
            props.navigation.popToTop();
        props.navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Animated.View style={containerBackgroundStyles}></Animated.View>
            <View style={styles.header}>
                <View style={styles.actions}>
                    {showBackBtn &&
                        <Icon name="chevron-left" size={32} color={theme.value.palette.primary} onPress={() => props.navigation.goBack()} />}
                    {leftActions}
                </View>
                <View style={styles.animationTitle}>
                    {headerTitleNode}
                </View>
                <View style={styles.actions}>
                    {rightActions}
                    {props.isModal  &&
                        <Icon name="close" size={32} color={theme.value.palette.primary} onPress={() => closeModal()}  />}
                </View>
            </View>
        </View>
    )
}

export default Header;