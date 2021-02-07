import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "context";

interface Props {
    size: "small" | "large";
    color?: string;
}

const Progress: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return <ActivityIndicator size={props.size} color={props.color ?? theme.value.palette.textColor} />
}

export default Progress;