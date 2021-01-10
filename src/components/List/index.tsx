import React from "react";
import { makeStyles } from "context";
import { TouchableOpacity, View } from "react-native";
import { Label, Icon } from "components";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        backgroundColor: theme.palette.cardColor,
        borderRadius: 10,
        marginTop: 5
    },
    listItem: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    listItemBorder: {
        borderBottomColor: theme.palette.gray,
        borderBottomWidth: 1
    }
}))

interface ListItem {
    text: string;
    onPress: () => void;
    iconName?: string;
    textColor?: string;
    iconColor?: string;
    action?: React.ReactNode;
}

interface Props {
    items: ListItem[];
}

const List: React.FC<Props> = (props: Props) => {
    const styles = useStyles();

    return (
        <View style={styles.container}>
            {props.items.map((item, index) => {
                const listItemStyle = [];
                listItemStyle.push(styles.listItem);
                if(index !== props.items.length-1)
                    listItemStyle.push(styles.listItemBorder)
                return (
                    <TouchableOpacity onPress={item.onPress} style={listItemStyle}>
                        <Label type="regular" text={item.text} color={item.textColor} />
                        {item.action ? item.action : <Icon name={item.iconName ?? "chevron-right"} size={24} color={item.iconColor} />}
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default List;