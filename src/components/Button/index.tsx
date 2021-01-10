import React from "react";
import { TouchableOpacity } from "react-native";
import { makeStyles, useTheme } from "context";
import { Progress, Label } from "components";

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
    loading?: boolean;
}

const Button: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    const theme = useTheme();
    return (
        <TouchableOpacity style={[styles.button]} onPress={props.onPress}>
            {props.loading ? <Progress size="small" color={theme.pallette.white} /> : (
                <Label 
                    type="regular" 
                    text={props.text} 
                    color={theme.pallette.white} 
                />
            )}
        </TouchableOpacity>
    )
}

export default Button;