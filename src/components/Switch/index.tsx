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
            trackColor={{ false: theme.pallette.primary, true: theme.pallette.primary }}
            value={props.value} 
        />
    )
}

export default Switch;