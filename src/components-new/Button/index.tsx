import React from "react";
import { TouchableOpacity } from "react-native";
import { colors } from "styles";
import Label from "components-new/Label";
import { makeStyles } from "context-new";

const useStyles = makeStyles(palette => ({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: palette.primary,
        alignItems: "center"
    }
}))

interface Props {
    onPress: () => void;
    text: string;
}

const Button: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    return (
        <TouchableOpacity style={[styles.button]} onPress={props.onPress}>
            <Label type="regular" text={props.text} color={colors.white} />
        </TouchableOpacity>
    )
}

export default Button;