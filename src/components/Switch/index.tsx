import { useTheme } from "context";
import React from "react";
import { Switch as RNSwitch } from "react-native";

interface Props {
    value: boolean;
}

const Switch: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <RNSwitch 
            trackColor={{ false: theme.value.palette.primary, true: theme.value.palette.primary }}
            value={props.value} 
        />
    )
}

export default Switch;