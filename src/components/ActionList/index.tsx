import React from "react";
import { makeStyles, useTheme } from "context";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { Label, Icon } from "components";

const useStyles = makeStyles(palette => ({
    container: {
        width: "100%",
        backgroundColor: palette.cardColor,
        marginTop: 5
    },
    listItem: {
        paddingHorizontal: Dimensions.get("screen").width*.1,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    listItemBorder: {
        borderBottomColor: palette.gray,
        borderBottomWidth: 1
    },
    listItemText: {
        flexDirection: "row"
    }
}))

interface ListItem {
    text: string;
    note?: { text: string; color: "red" | "greeen"; };
    onPress: () => void;
    iconName?: string;
    textColor?: string;
    iconColor?: string;
    action?: React.ReactNode;
}

interface Props {
    items: ListItem[];
}

const ActionList: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    const theme = useTheme();

    return (
        <View style={styles.container}>
            {props.items.map((item, index) => {
                const listItemStyle = [];
                listItemStyle.push(styles.listItem);
                if(index !== props.items.length-1)
                    listItemStyle.push(styles.listItemBorder)
                return (
                    <TouchableOpacity onPress={item.onPress} style={listItemStyle}>
                        <View style={styles.listItemText}>
                            <Label type="regular" text={item.text} color={item.textColor} />
                            {item.note &&
                                <Label type="subText" text={item.note.text} color={item.note.color === "red" ? theme.pallette.error : theme.pallette.success} />}
                        </View>
                        {item.action ? item.action : <Icon name={item.iconName ?? "chevron-right"} size={24} color={item.iconColor} />}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default ActionList;