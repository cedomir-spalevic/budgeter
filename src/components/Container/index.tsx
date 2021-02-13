import { useNavigation } from "@react-navigation/native";
import { Label } from "components";
import { makeStyles, useScroll } from "context";
import React, { useEffect, useRef } from "react";
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
    title?: string;
    preventTitleAnimation?: boolean;
    onCloseToBottom?: () => void;
}

const Container: React.FC<Props> = (props: Props) => {
    const navigation = useNavigation();
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
        // Check if closae to bottom
        if((event.nativeEvent.layoutMeasurement.height + event.nativeEvent.contentOffset.y) >= (event.nativeEvent.contentSize.height - 1)
            && props.onCloseToBottom)
            props.onCloseToBottom();
            

        scrollY.current.setValue(event.nativeEvent.contentOffset.y);
        if(props.preventTitleAnimation) {
            navigation.setOptions({
                containerBackground: {
                    opacity: scrollY.current.interpolate({
                        inputRange: [0, 33],
                        outputRange: [0, 1],
                        extrapolate: "clamp"
                    })
                }
            });
            return;
        }

        navigation.setOptions({
            containerBackground: {
                opacity: scrollY.current.interpolate({
                    inputRange: [0, 33],
                    outputRange: [0, 1],
                    extrapolate: "clamp"
                })
            },
            headerTitle: () => (
                <Animated.View
                    style={{
                        position: "absolute",
                        bottom: scrollY.current.interpolate({
                            inputRange: [0, 10, 26, 33],
                            outputRange: [-30, -13, -5, 0],
                            extrapolate: "clamp"
                        }),
                        overflow: "hidden",
                        width: "100%",
                        textAlign: "center"
                    }}
                >
                    <Label style={{ paddingTop: 10, textAlign: "center" }} text={props.title} type="regular" />
                </Animated.View>
            )
        })
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