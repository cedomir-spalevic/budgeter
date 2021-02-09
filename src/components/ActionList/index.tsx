import React, { useState } from "react";
import { makeStyles, useScroll, useTheme } from "context";
import { TouchableOpacity, View } from "react-native";
import { Label, Icon, SwipeContainer } from "components";
import Swipeable from "react-native-swipeable";

const useStyles = makeStyles(theme => ({
    container: {
        width: "100%",
        backgroundColor: theme.palette.secondaryBackground,
        marginTop: 5
    },
    listItem: {
        paddingHorizontal: theme.size.pagePadding,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    listItemBorder: {
        borderBottomColor: theme.palette.systemGray4,
        borderBottomWidth: 1
    },
    listItemText: {
        flexDirection: "row"
    }
}))

interface SwipeContent {
    color: string;
    iconName: string;
}

interface ListItem {
    id: string;
    text: string;
    note?: { text: string; color: "red" | "green"; };
    onPress: () => void;
    postIconName?: string;
    textColor?: string;
    postIconColor?: string;
    preIcon?: React.ReactNode;
    action?: React.ReactNode;
    leftSwipeContent?: SwipeContent;
    rightSwipeContent?: SwipeContent;
    leftSwipeButtons?: SwipeContent[];
    rightSwipeButtons?: SwipeContent[];
    onLeftActionRelease?: () => void;
    onRightActionRelease?: () => void;
}

interface Props {
    items: ListItem[];
}

interface SwipeActivation {
    [id: string]: boolean;
}

const ActionList: React.FC<Props> = (props: Props) => {
    const [itemSwipeActivations, setItemSwipeActivations] = useState<SwipeActivation>({});
    const styles = useStyles();
    const theme = useTheme();
    const scroll = useScroll();

    const toggleItemSwipeActivations = (id) => {
        itemSwipeActivations[id] = !itemSwipeActivations[id];
        setItemSwipeActivations({ ...itemSwipeActivations });
     }

    return (
        <View style={styles.container}>
            {props.items.map((item, index) => {
                const listItemStyle = [];
                listItemStyle.push(styles.listItem);
                if(index !== props.items.length-1)
                    listItemStyle.push(styles.listItemBorder);
                let leftSwipeContent = undefined, rightSwipeContent = undefined;
                if(item.leftSwipeContent) {
                    leftSwipeContent = (
                        <SwipeContainer
                            side="left"
                            activated={item.id in itemSwipeActivations && itemSwipeActivations[item.id]}
                            icon={<Icon name={item.leftSwipeContent.iconName} color={theme.value.palette.white} size={28} />}
                            color={item.leftSwipeContent.color}
                        />
                    )
                }
                if(item.rightSwipeContent) {
                    rightSwipeContent = (
                        <SwipeContainer
                            side="right"
                            activated={item.id in itemSwipeActivations && itemSwipeActivations[item.id]}
                            icon={<Icon name={item.rightSwipeContent.iconName} color={theme.value.palette.white} size={28} />}
                            color={item.rightSwipeContent.color}
                        />
                    )
                }
                return (
                    <Swipeable
                        leftContent={leftSwipeContent}
                        rightContent={rightSwipeContent}
                        leftButtons={item.leftSwipeButtons}
                        rightButtons={item.rightSwipeButtons}
                        leftActionActivationDistance={75}
                        leftButtonWidth={75}
                        rightActionActivationDistance={75}
                        onLeftActionRelease={() => {
                            if(item.onLeftActionRelease)
                                item.onLeftActionRelease();
                            toggleItemSwipeActivations(item.id);
                        }}
                        onRightActionRelease={() => {
                            if(item.onRightActionRelease)
                                item.onRightActionRelease();
                            toggleItemSwipeActivations(item.id);
                        }}
                        onLeftActionActivate={() => toggleItemSwipeActivations(item.id)}
                        onRightActionActivate={() => toggleItemSwipeActivations(item.id)}
                        onLeftActionDeactivate={() => toggleItemSwipeActivations(item.id)}
                        onRightActionDeactivate={() => toggleItemSwipeActivations(item.id)}
                        onSwipeStart={() => scroll.setIsSwiping(true)}
                        onSwipeRelease={() => scroll.setIsSwiping(false)}
                        useNativeDriver={false}
                    >
                        <TouchableOpacity key={item.id} onPress={item.onPress} style={listItemStyle}>
                            <View style={styles.listItemText}>
                                {item.preIcon}
                                <Label type="regular" text={item.text} color={item.textColor} />
                                {item.note &&
                                    <Label 
                                        style={{ paddingLeft: 8 }} 
                                        type="subText" 
                                        text={item.note.text} 
                                        color={item.note.color === "red" ? theme.value.palette.red : theme.value.palette.green} 
                                    />
                                }
                            </View>
                            {item.action ? item.action : <Icon name={item.postIconName ?? "chevron-right"} size={24} color={item.postIconColor} />}
                        </TouchableOpacity>
                    </Swipeable>
                )
            })}
        </View>
    )
}

export default ActionList;