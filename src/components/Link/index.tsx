import React from "react";
import { TouchableOpacity, TextStyle } from "react-native";
import { Label } from "components";
import { useTheme } from "context";

interface Props {
    onPress: () => void;
    text: string;
    style?: TextStyle;
}

const Link: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Label type="regular" text={props.text} color={theme.value.palette.primary} style={props.style} />
        </TouchableOpacity>
    )
}

export default Link;