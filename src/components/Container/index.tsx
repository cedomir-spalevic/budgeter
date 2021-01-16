import { makeStyles, useScroll } from "context";
import React, { useEffect, useRef } from "react";
import { 
    View,
    StyleProp,
    ViewStyle,
    ScrollView
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

    useEffect(() => {
        if(scrollView.current)
            scroll.setRef(scrollView);
    }, [scrollView.current])

    if(props.allowScroll) {
        return (
            <ScrollView ref={scrollView} contentContainerStyle={style}>
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