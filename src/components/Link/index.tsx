import React from "react";
import { TouchableHighlight, TextStyle, StyleProp, ViewStyle } from "react-native";
import { Label } from "components";
import { useTheme } from "context";

interface Props {
    onPress: () => void;
    text: string;
    style?: StyleProp<ViewStyle>;
    labelStyle?: TextStyle;
}

const Link: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <TouchableHighlight style={props.style} onPress={props.onPress} activeOpacity={0.6} underlayColor={theme.value.palette.systemGray4}>
            <Label type="regular" text={props.text} color={theme.value.palette.primary} style={props.labelStyle} />
        </TouchableHighlight>
    )
}

export default Link;