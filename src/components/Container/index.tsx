import { useNavigation, useRoute } from "@react-navigation/native";
import { Label } from "components";
import { makeStyles, useScroll } from "context";
import React, { useEffect, useRef, useState } from "react";
import { 
    View,
    StyleProp,
    ViewStyle,
    ScrollView,
    Animated,
    NativeSyntheticEvent,
    NativeScrollEvent
} from "react-native";

const useStyles = makeStyles(theme => ({
    container: {
        paddingHorizontal: theme.size.pagePadding
    },
    verticallyCenter: {
        justifyContent: "center"
    },
    horizontallyCenter: {
        alignItems: "center"
    },
    flex: {
        flex: 1,
        flexGrow: 1,
        paddingBottom: 20
    }
}))

interface Props {
    children: React.ReactNode;
    verticallyCenter?: boolean;
    horizontallyCenter?: boolean;
    justifyContent?: "center" | "flex-end" | "flex-start" | "space-around" | "space-between" | "space-evenly";
    alignItems?: "baseline" | "center" | "flex-end" | "flex-start" | "stretch"
    flex?: boolean;
    fullWith?: boolean;
    allowScroll?: boolean;
}

const Container: React.FC<Props> = (props: Props) => {
    const scrollY = useRef<Animated.Value>(new Animated.Value(0));
    const scrollView = useRef<ScrollView>();
    const styles = useStyles();
    const scroll = useScroll();
    const style: StyleProp<ViewStyle> = [];
    if(!props.fullWith)
        style.push(styles.container);
    if(props.flex)
        style.push(styles.flex);
    if(props.verticallyCenter)
        style.push(styles.verticallyCenter);
    if(props.horizontallyCenter)
        style.push(styles.horizontallyCenter);
    if(props.justifyContent)
        style.push({ justifyContent: props.justifyContent });
    if(props.alignItems)
        style.push({ alignItems: props.alignItems });

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        scrollY.current.setValue(event.nativeEvent.contentOffset.y);
        // navigation.setOptions({
        //     header: () => (
        //         <Animated.View
        //             style={{
        //                 position: "absolute",
        //                 top: scrollY.current.interpolate({
        //                     inputRange: [0, 100],
        //                     outputRange: [100, 0],
        //                     extrapolate: "clamp"
        //                 }),
        //                 overflow: "hidden"
        //             }}
        //         >
        //             <Label text="Test" type="regular" />
        //         </Animated.View>
        //     )
        // })
    }

    useEffect(() => {
        if(scrollView.current)
            scroll.setRef(scrollView);
    }, [scrollView.current])

    if(props.allowScroll) {
        return (
            <ScrollView 
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ref={scrollView} 
                contentContainerStyle={style} 
                scrollEnabled={!scroll.isSwiping} 
                keyboardShouldPersistTaps="handled"
            >
                {props.children}
            </ScrollView>
        )
    }
    return (
        <View style={style}>
            {props.children}
        </View>
    )
}

export default Container;