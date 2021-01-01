import React from "react";
import { TouchableOpacity, TextStyle } from "react-native";
import { colors } from "styles";
import { Label } from "components-new";

interface Props {
    onPress: () => void;
    text: string;
    style?: TextStyle;
}

const Link: React.FC<Props> = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Label type="subText" text={props.text} color={colors.primary} style={props.style} />
        </TouchableOpacity>
    )
}

export default Link;