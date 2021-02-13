import { Icon, Label, SwipeContainer } from "components";
import { makeStyles, useScroll, useTheme } from "context";
import React, { useState, useRef, useEffect } from "react";
import { Animated, TextStyle, TouchableHighlight, View } from "react-native";
import Swipeable from "react-native-swipeable";
import { ListItem } from "..";

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
        flexDirection: "row",
        flex: 1
    }
}))

interface Props {
    item: ListItem;
    isLast: boolean;
}

const Item: React.FC<Props> = (props: Props) => {
    const [activated, setActivated] = useState<boolean>(false);
    const [listItemTextWidth, setListItemTextWidth] = useState<number>();
    const [noteWidth, setNoteWidth] = useState<number>();
    const [titleWidth, setTitleWidth] = useState<number>();
    const listItemHeightValue = useRef<Animated.Value>(new Animated.Value(0));
    const theme = useTheme();
    const styles = useStyles();
    const scroll = useScroll();
    let titleStyle: TextStyle = {};
    if(listItemTextWidth && noteWidth && titleWidth && (titleWidth > (listItemTextWidth-noteWidth))) {
        titleStyle = { width: (listItemTextWidth-noteWidth)-25 }
    }
    const listItemStyle = [];
    listItemStyle.push(styles.listItem);
    if(!props.isLast)
        listItemStyle.push(styles.listItemBorder);
    let leftSwipeContent = undefined, rightSwipeContent = undefined;
    if(props.item.leftSwipeContent) {
        leftSwipeContent = (
            <SwipeContainer
                side="left"
                activated={activated}
                icon={<Icon name={props.item.leftSwipeContent.iconName} color={theme.value.palette.white} size={28} />}
                color={props.item.leftSwipeContent.color}
            />
        )
    }
    if(props.item.rightSwipeContent) {
        rightSwipeContent = (
            <SwipeContainer
                side="right"
                activated={activated}
                icon={<Icon name={props.item.rightSwipeContent.iconName} color={theme.value.palette.white} size={28} />}
                color={props.item.rightSwipeContent.color}
            />
        )
    }

    useEffect(() => {
        if(listItemTextWidth && noteWidth && titleWidth) {
            Animated.timing(
               listItemHeightValue.current,
               {
                  toValue: 25,
                  duration: 275,
                  useNativeDriver: false
               }
            ).start(e => {
            });
        }
    }, [listItemTextWidth, noteWidth, titleWidth])

    return (
        <Swipeable
            leftContent={leftSwipeContent}
            rightContent={rightSwipeContent}
            leftButtons={props.item.leftSwipeButtons}
            rightButtons={props.item.rightSwipeButtons}
            leftActionActivationDistance={75}
            leftButtonWidth={75}
            rightActionActivationDistance={75}
            onLeftActionRelease={() => {
                if(props.item.onLeftActionRelease)
                    props.item.onLeftActionRelease();
                setActivated(false);
            }}
            onRightActionRelease={() => {
                if(props.item.onRightActionRelease)
                    props.item.onRightActionRelease();
                setActivated(false);
            }}
            onLeftActionActivate={() => setActivated(true)}
            onRightActionActivate={() => setActivated(true)}
            onLeftActionDeactivate={() => setActivated(true)}
            onRightActionDeactivate={() => setActivated(true)}
            onSwipeStart={() => scroll.setIsSwiping(true)}
            onSwipeRelease={() => scroll.setIsSwiping(false)}
            useNativeDriver={false}
        >
            <TouchableHighlight key={props.item.id} onPress={props.item.onPress} activeOpacity={0.6} underlayColor={theme.value.palette.systemGray4}>
                <View style={listItemStyle}>
                    <Animated.View style={{...styles.listItemText, height: listItemHeightValue.current}} onLayout={e => !listItemTextWidth && setListItemTextWidth(e.nativeEvent.layout.width)}>
                        {/* {props.item.preIcon} */}
                        <Label 
                            onLayout={e => !titleWidth && setTitleWidth(e.nativeEvent.layout.width)}
                            style={titleStyle}
                            type="regular" 
                            text={props.item.text} 
                            color={props.item.textColor} 
                            ellipsizeMode="tail"
                            numberOfLines={1}
                        />
                        {props.item.note &&
                            <Label 
                                onLayout={e => !noteWidth && setNoteWidth(e.nativeEvent.layout.width)}
                                style={{ paddingLeft: 8 }} 
                                type="subText" 
                                text={props.item.note.text} 
                                color={props.item.note.color === "red" ? theme.value.palette.red : theme.value.palette.green} 
                            />
                        }
                    </Animated.View>
                    {props.item.action ? props.item.action : <Icon name={props.item.postIconName ?? "chevron-right"} size={24} color={props.item.postIconColor} />}
                </View>
            </TouchableHighlight>
        </Swipeable>
    )
}

export default Item;