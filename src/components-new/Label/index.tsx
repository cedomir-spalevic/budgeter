import { makeStyles } from "context-new";
import React from "react";
import {
    Text,
    StyleProp,
    TextStyle
} from "react-native";

const useStyles = makeStyles(palette => ({
    regular: {
        fontFamily: "Helvetica Neue",
        fontSize: 22,
        color: palette.textColor
    },
    header: {
        fontFamily: "Helvetica Neue",
        fontSize: 32,
        fontWeight: "bold",
        color: palette.textColor
    },
    shadow: {
        fontFamily: "Helvetica Neue",
        fontSize: 18,
        color: palette.darkBlue,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: { width: 2, height: 2},
        shadowColor: palette.textColor
    },
    subText: {
        fontFamily: "Helvetica Neue",
        fontSize: 18,
        color: palette.textColor
    }
}));

interface Props {
    type: "header" | "regular" | "subText" | "shadow";
    text: string;
    color?: string;
    style?: TextStyle;
}

const Label: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
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
    if(props.style)
        style.push(props.style);
    return <Text style={style}>{props.text}</Text>
}

export default Label;