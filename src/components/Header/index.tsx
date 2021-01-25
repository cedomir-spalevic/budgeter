import { 
    StackNavigationProp, 
    StackHeaderStyleInterpolator
} from "@react-navigation/stack";
import { makeStyles, useTheme } from "context";
import React from "react";
import {
    Animated,
    View
} from "react-native";
import { Icon } from "components";
import { NavigationProp, ParamListBase, Route, StackNavigationState } from "@react-navigation/native";
import { Layout, StackNavigationOptions } from "@react-navigation/stack/lib/typescript/src/types";
import { EdgeInsets } from "react-native-safe-area-context";
import Label from "components/Label";

interface ExtraNavigationProps {
    popToTop?: boolean;
    hideHeaderLeft?: boolean;
    hideHeaderRight?: boolean;
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
    header: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: theme.size.pagePadding,
        backgroundColor: theme.palette.secondary
    },
    animationTitle: {
        paddingTop: 50,
        position: "relative",
        width: 150,
        borderColor: "#ccc",
        borderWidth: 2,
        overflow: "hidden"
    },
    actions: {
        paddingTop: 50
    }
}))

interface Props {
    parentIsModal?: boolean;
    isModal?: boolean;
    initialRoute?: string;
    enableTitleScroll?: boolean;
}

const Header: React.FC<Props & StackHeaderProps> = (props: Props & StackHeaderProps) => {
    const styles = useStyles();
    const theme = useTheme();
    const headerTitle = props.scene.descriptor.options.headerTitle;
    const headerTitleNode = headerTitle && typeof(headerTitle) === "function" && headerTitle({ onLayout: () => {} });
    const headerLeft = props.scene.descriptor.options.headerLeft;
    const leftActions = headerLeft && headerLeft({ tintColor: theme.value.palette.primary });
    const headerRight = props.scene.descriptor.options.headerRight;
    const rightActions = headerRight && headerRight({ tintColor: theme.value.palette.primary });
    const popToTop = props.scene.descriptor.options.popToTop;
    if(popToTop)
        props.navigation.popToTop();

    const closeModal = () => {
        console.log(props.scene.descriptor.navigation.dangerouslyGetState())
        if(props.navigation.dangerouslyGetState().routeNames.length > 1)
            props.navigation.popToTop();
        if(props.navigation.canGoBack())
            props.navigation.goBack();
    }

    const goBack = () => {
        if(props.previous && props.previous.route.name === props.initialRoute)
            //setShowBackButton(false);
        props.navigation.goBack();
    }

    return (
        <View style={styles.header}>
            <View style={styles.actions}>
                {leftActions}
            </View>
            <View style={styles.animationTitle}>
                <View>
                    <Label type="regular" text="Hello" />
                    </View>
            </View>
            <View style={styles.actions}>
                {rightActions}
                {props.isModal  &&
                    <Icon name="close" size={32} color={theme.value.palette.primary} onPress={() => closeModal()}  />}
            </View>
        </View>
    )
}

export default Header;