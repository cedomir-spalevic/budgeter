import React from "react";
import { TouchableOpacity, TextStyle, StyleProp, ViewStyle } from "react-native";
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
        <TouchableOpacity style={props.style} onPress={props.onPress}>
            <Label type="regular" text={props.text} color={theme.value.palette.primary} style={props.labelStyle} />
        </TouchableOpacity>
    )
}

export default Link;