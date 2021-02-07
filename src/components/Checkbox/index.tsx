import React from "react";
import RNCheckbox from "@react-native-community/checkbox";
import { useTheme } from "context";

interface Props {
    checked: boolean;
    onChange?: () => void;
}

const Checkbox: React.FC<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <RNCheckbox 
            onCheckColor={theme.value.palette.tabBarColor}
            tintColor={theme.value.palette.textColor}
            onFillColor={theme.value.palette.primary}
            animationDuration={0}
            value={props.checked}
            disabled={!props.onChange}
            onValueChange={() => props.onChange && props.onChange()}
            style={{ width: 20, height: 20 }}
        />
    )
}

export default Checkbox;