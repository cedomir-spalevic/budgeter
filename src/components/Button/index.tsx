import React from "react";
import { TouchableOpacity } from "react-native";
import { makeStyles, useTheme } from "context";
import { Progress, Label } from "components";

const useStyles = makeStyles(theme => ({
    button: {
        borderRadius: 20,
        backgroundColor: theme.palette.primary,
        alignItems: "center"
    },
    buttonSmall: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    buttonLarge: {
        paddingVertical: 15,
        paddingHorizontal: 15
    }
}))

interface Props {
    onPress: () => void;
    text: string;
    loading?: boolean;
    size?: "small" | "large"
}

const Button: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    const theme = useTheme();
    const buttonStyles = [styles.button];
    buttonStyles.push(props.size === "large" ? styles.buttonLarge : styles.buttonSmall)

    return (
        <TouchableOpacity style={buttonStyles} onPress={props.onPress}>
            {props.loading ? <Progress size="small" color={theme.value.palette.white} /> : (
                <Label 
                    type="regular" 
                    text={props.text} 
                    color={theme.value.palette.white} 
                />
            )}
        </TouchableOpacity>
    )
}

export default Button;