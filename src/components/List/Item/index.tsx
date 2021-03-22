import { Icon, Label } from "components";
import { makeStyles, useTheme } from "context";
import React, { useEffect, useRef, useState } from "react";
import {
   Animated,
   StyleProp,
   TextStyle,
   TouchableHighlight,
   View,
   ViewStyle
} from "react-native";
import { ListItem } from "..";

const useStyles = makeStyles((theme) => ({
   touchableHighlight: {
      borderRadius: 10
   },
   listItem: {
      paddingHorizontal: 20,
      paddingVertical: 15,
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
}));

interface Props {
   item: ListItem;
   isLast: boolean;
}

const Item: React.FC<Props> = (props: Props) => {
   const [listItemTextWidth, setListItemTextWidth] = useState<number>();
   const [noteWidth, setNoteWidth] = useState<number>();
   const [titleWidth, setTitleWidth] = useState<number>();
   const listItemHeightValue = useRef<Animated.Value>(new Animated.Value(0));
   let titleStyle: TextStyle = {};
   if (
      listItemTextWidth &&
      noteWidth &&
      titleWidth &&
      titleWidth > listItemTextWidth - noteWidth
   ) {
      titleStyle = { width: listItemTextWidth - noteWidth - 25 };
   }
   const theme = useTheme();
   const styles = useStyles();
   const listItemStyle: StyleProp<ViewStyle> = [];
   listItemStyle.push(styles.listItem);
   if (!props.isLast) listItemStyle.push(styles.listItemBorder);

   useEffect(() => {
      if ((listItemTextWidth && noteWidth && titleWidth) || !props.item.note) {
         Animated.timing(listItemHeightValue.current, {
            toValue: 20,
            duration: 100,
            useNativeDriver: false
         }).start();
      }
   }, [listItemTextWidth, noteWidth, titleWidth]);

   return (
      <TouchableHighlight
         key={props.item.id}
         onPress={props.item.onPress}
         style={styles.touchableHighlight}
         activeOpacity={0.6}
         underlayColor={theme.value.palette.systemGray4}
      >
         <View style={listItemStyle}>
            <Animated.View
               style={{
                  ...styles.listItemText,
                  height: listItemHeightValue.current
               }}
               onLayout={(e) =>
                  !listItemTextWidth &&
                  setListItemTextWidth(e.nativeEvent.layout.width)
               }
            >
               <Label
                  onLayout={(e) =>
                     !titleWidth && setTitleWidth(e.nativeEvent.layout.width)
                  }
                  style={titleStyle}
                  type="regular"
                  text={props.item.text}
                  color={props.item.textColor}
                  ellipsizeMode="tail"
                  numberOfLines={1}
               />
               {props.item.note && (
                  <Label
                     onLayout={(e) =>
                        !noteWidth && setNoteWidth(e.nativeEvent.layout.width)
                     }
                     style={{ paddingLeft: 8 }}
                     type="subText"
                     text={props.item.note.text}
                     color={
                        props.item.note.color === "red"
                           ? theme.value.palette.red
                           : theme.value.palette.green
                     }
                  />
               )}
            </Animated.View>
            {props.item.action ? (
               props.item.action
            ) : (
               <Icon
                  name={props.item.iconName ?? "chevron-right"}
                  size={24}
                  color={props.item.iconColor}
               />
            )}
         </View>
      </TouchableHighlight>
   );
};

export default Item;
