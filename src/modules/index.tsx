import React from "react";
import { StackNavigationOptions } from "@react-navigation/stack";
import { colors } from "styles";
import { Icon } from "components";

export const defaultScreenOptions: StackNavigationOptions = {
    headerTintColor: colors.primary,
    headerTitleStyle: { color: colors.black },
    headerBackImage: (color) => (
        <Icon 
            name="keyboard-arrow-left" 
            size={32} 
            style={{ paddingLeft: 20, color: color.tintColor }} 
        />
    ),
    headerBackTitleVisible: false
}