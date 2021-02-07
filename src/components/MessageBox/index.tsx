import React from "react";
import { makeStyles, useTheme } from "context";
import { TouchableOpacity, View } from "react-native";
import { Label, Icon } from "components";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        backgroundColor: theme.palette.gray,
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
        height: 164,
        justifyContent: "space-between",
        alignItems: "center"
    }
}))

interface Props {
    children: React.ReactNode;
}

const MessageBox: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    const theme = useTheme();

    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

export default MessageBox;