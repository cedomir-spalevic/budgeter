import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "context";

interface Props {
    size: "small" | "large";
}

const Progress: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return <ActivityIndicator size={props.size} color={theme.pallette.textColor} />
}

export default Progress;