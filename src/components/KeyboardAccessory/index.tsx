import { makeStyles } from "context";
import React from "react";
import { 
    View, 
    StyleProp,
    ViewStyle
} from "react-native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";

const useStyles = makeStyles(theme => ({
    container: {
        paddingVertical: 10,
        paddingHorizontal: theme.size.pagePadding,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.palette.secondary
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