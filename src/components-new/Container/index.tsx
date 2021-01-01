import React from "react";
import { 
    View, 
    StyleSheet, 
    Dimensions, 
    StyleProp,
    ViewStyle
} from "react-native";

const oneTenth = Dimensions.get("screen").width * 0.1;

const styles = StyleSheet.create({
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
        flex: 1
    }
})

interface Props {
    children: React.ReactNode;
    verticallyCenter?: boolean;
    horizontallyCenter?: boolean;
    flex?: boolean;
}

const Container: React.FC<Props> = (props: Props) => {
    const style: StyleProp<ViewStyle> = [];
    style.push(styles.container);
    if(props.flex)
        style.push(styles.flex);
    if(props.verticallyCenter)
        style.push(styles.verticallyCenter);
    if(props.horizontallyCenter)
        style.push(styles.horizontallyCenter);
    return (
        <View style={style}>
            {props.children}
        </View>
    )
}

export default Container;