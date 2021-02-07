import { makeStyles } from "context";
import React from "react";
import {
    Text,
    StyleProp,
    TextStyle
} from "react-native";

const useStyles = makeStyles(theme => ({
    regular: {
        fontFamily: theme.font.fontFamily,
        fontSize: theme.font.regularSize,
        color: theme.palette.textColor
    },
    code: {
        fontFamily: theme.font.fontFamily,
        fontSize: 24,
        color: theme.palette.textColor
    },
    header: {
        fontFamily: theme.font.fontFamily,
        fontSize: theme.font.headerSize,
        fontWeight: "bold",
        color: theme.palette.textColor
    },
    shadow: {
        fontFamily: theme.font.fontFamily,
        fontSize: 18,
        color: theme.palette.darkBlue,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: { width: 2, height: 2},
        shadowColor: theme.palette.textColor
    },
    subText: {
        fontFamily: theme.font.fontFamily,
        fontSize: theme.font.subTextSize,
        color: theme.palette.textColor
    }
}));

interface Props {
    type: "header" | "regular" | "subText" | "shadow" | "code";
    text: string | React.ReactNode;
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
        case "code":
            style.push(styles.code);
            break;
    }
    if(props.color)
        style.push({ color: props.color });
    if(props.style)
        style.push(props.style);
    return <Text adjustsFontSizeToFit style={style}>{props.text}</Text>
}

export default Label;