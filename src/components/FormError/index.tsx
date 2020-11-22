import React from "react";
import { View , Text, TextStyle, StyleProp} from "react-native";
import { globalStyles } from "styles";
import { Icon } from "components";

interface Props {
    visible: boolean;
    message?: string;
}

const FormError: React.FC<Props> = (props: Props) => {
    if(!props.visible)
        return null;

    return (
        <View style={globalStyles.formError}>
            <>
                <Icon name="error" style={globalStyles.formErrorText} />
                <Text style={globalStyles.formErrorText}>{props.message}</Text>
            </>
        </View>
    )
}

export default FormError;