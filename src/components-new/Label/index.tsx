import React from "react";
import {
    Text,                                      
    StyleSheet,
    StyleProp,
    TextStyle
} from "react-native";
import { colors } from "styles";

const styles = StyleSheet.create({
    regular: {
        fontFamily: "Helvetica Neue",
        fontSize: 22,
        color: colors.black
    },
    header: {
        fontFamily: "Helvetica Neue",
        fontSize: 32,
        fontWeight: "bold",
        color: colors.black
    },
    shadow: {
        fontFamily: "Helvetica Neue",
        fontSize: 18,
        color: colors.darkBlue,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: { width: 2, height: 2}
    },
    subText: {
        fontFamily: "Helvetica Neue",
        fontSize: 18,
    }
})

interface Props {
    type: "header" | "regular" | "subText" | "shadow";
    text: string;
    color?: string;
}

const Label: React.FC<Props> = (props: Props) => {
    const style: StyleProp<TextStyle> = [];
    switch(props.type) {
        case "header":
            style.push(styles.header);
            break;
        case "regular":
            style.push(styles.regular);
            break;
        case "subText":
            style.push(styles.subText);
            break;
        case "shadow":
            style.push(styles.shadow);
            break;
    }
    if(props.color)
        style.push({ color: props.color });
    return <Text style={style}>{props.text}</Text>
}

export default Label;