import { makeStyles } from "context-new";
import React from "react";
import { 
    View, 
    StyleSheet, 
    Dimensions,
    StyleProp,
    ViewStyle
} from "react-native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

const oneTenth = Dimensions.get("screen").width * 0.05;
const useStyles = makeStyles(palette => ({
    container: {
        paddingVertical: 10,
        paddingHorizontal: oneTenth,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: palette.secondary
    }
}))

interface Props {
    children: React.ReactNode;
    justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly"

}

const KeyboardAccessory: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    const style: StyleProp<ViewStyle> = [];
    style.push(styles.container);
    if(props.justifyContent)
        style.push({ justifyContent: props.justifyContent });
    return (
        <KeyboardAccessoryView alwaysVisible androidAdjustResize>
            <View style={style}>
                {props.children}
            </View>
        </KeyboardAccessoryView>
    )
}

export default KeyboardAccessory;