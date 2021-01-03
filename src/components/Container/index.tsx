import { makeStyles } from "context";
import React from "react";
import { 
    View, 
    StyleSheet, 
    Dimensions, 
    StyleProp,
    ViewStyle
} from "react-native";

const oneTenth = Dimensions.get("screen").width * 0.1;
const useStyles = makeStyles(() => ({
    container: {
        paddingHorizontal: oneTenth
    },
    verticallyCenter: {
        justifyContent: "center"
    },
    horizontallyCenter: {
        alignItems: "center"
    },
    flex: {
        flex: 1,
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
}

const Container: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    const style: StyleProp<ViewStyle> = [];
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
    return (
        <View style={style}>
            {props.children}
        </View>
    )
}

export default Container;