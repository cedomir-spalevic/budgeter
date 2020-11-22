import React from "react";
import {default as MaterialIcon} from "react-native-vector-icons/MaterialIcons";
import { StyleProp, TextStyle } from "react-native";


interface Props {
    name: string;
    color?: string;
    size?: number;
    style?: StyleProp<TextStyle>;
    onPress?: () => void;
}

const Icon: React.FC<Props> = (props: Props) => (
    <MaterialIcon 
        name={props.name} 
        color={props.color}
        size={props.size}
        style={props.style}
        onPress={props.onPress}
    />
)

export default Icon;