import React from "react";
import { makeStyles } from "context";
import { StyleProp, View, ViewStyle } from "react-native";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        backgroundColor: theme.palette.secondaryBackground,
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
    }
}))

interface Props {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}

const Box: React.FC<Props> = (props: Props) => {
    const styles = useStyles();

    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    )
}

export default Box;