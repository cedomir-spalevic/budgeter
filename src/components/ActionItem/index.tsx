import React from "react";
import { makeStyles } from "context";
import { View } from "react-native";

const useStyles = makeStyles(palette => ({
    header: {
        justifyContent: "space-between",
        paddingBottom: 10
    }
}))

interface Props {
    title: React.ReactNode;
    action?: React.ReactNode;
    children: React.ReactNode;
}

const ActionItem: React.FC<Props> = (props: Props) => {
    const styles = useStyles();

    return (
        <View>
            <View style={styles.header}>
                {props.title}
                {props.action}
            </View>
            {props.children}
        </View>
    )
}

export default ActionItem;