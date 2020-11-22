import React from "react";
import Swipeable from "react-native-swipeable";
import {
   View,
   StyleSheet,
   TouchableWithoutFeedback, ActivityIndicator
} from "react-native";
import { colors, globalStyles } from "styles";
import { Icon, Label } from "components";
import SwipeContainer from "components/SwipeContainer";

const styles = StyleSheet.create({
   container: {
      padding: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: colors.white,
      borderRadius: 5,
      height: 65
   },
   textContainer: {
      flexDirection: "column"
   },
   swipeContent: {
      flexDirection: "row",
      alignItems: "center"
   },
   leftSwipeContent: {
      justifyContent: "flex-end",
      paddingRight: 20
   },
   rightSwipeContent: {
      justifyContent: "flex-start",
      paddingLeft: 20
   }
})

export interface SwipeContent {
   activated?: boolean;
   color: string;
   iconName: string;
}

export interface Item {
   id: string;
   name: string;
   description: string;
   icon?: JSX.Element;
   leftSwipeContent?: SwipeContent;
   rightSwipeContent?: SwipeContent;
   leftSwipeButtons?: SwipeContent[];
   rightSwipeButtons?: SwipeContent[];
   onLeftActionRelease?: () => void;
   onRightActionRelease?: () => void;
   onPressAction?: () => void;
}

interface Props {
   item: Item;
   onLeftActionActivated?: () => void;
   onRightActionActivated?: () => void;
   onLeftActionDeactivated?: () => void;
   onRightActionDeactivated?: () => void;
   onSwipeStart?: () => void;
   onSwipeRelease?: () => void;
}

const ListItem: React.FC<Props> = (props: Props) => {
   let leftSwipeContent = undefined, rightSwipeContent = undefined;
   if(props.item.leftSwipeContent) 
      leftSwipeContent = (
         <SwipeContainer
            side="left"
            activated={props.item.leftSwipeContent.activated}
            icon={(
               props.item.leftSwipeContent.activated ?
               <ActivityIndicator color={colors.white} /> :
               <Icon name={props.item.leftSwipeContent.iconName} color={colors.white} size={28} />
            )}
            color={props.item.leftSwipeContent.color}
         />
      )
   if(props.item.rightSwipeContent)
      rightSwipeContent = (
         <SwipeContainer
            side="right"
            activated={props.item.rightSwipeContent.activated}
            icon={(
               props.item.rightSwipeContent.activated ?
               <ActivityIndicator color={colors.white} /> :
               <Icon name={props.item.rightSwipeContent.iconName} color={colors.white} size={28} />
            )}
            color={props.item.rightSwipeContent.color}
         />
      )

   return (
      <Swipeable
         style={globalStyles.inputContainer}
         leftContent={leftSwipeContent}
         rightContent={rightSwipeContent}
         leftButtons={props.item.leftSwipeButtons}
         rightButtons={props.item.rightSwipeButtons}
         onLeftActionRelease={props.item.onLeftActionRelease}
         onRightActionRelease={props.item.onRightActionRelease}
         onLeftActionActivate={props.onLeftActionActivated}
         onRightActionActivate={props.onRightActionActivated}
         onLeftActionDeactivate={props.onLeftActionDeactivated}
         onRightActionDeactivate={props.onRightActionDeactivated}
         onSwipeStart={props.onSwipeStart}
         onSwipeRelease={props.onSwipeRelease}
      >
         <TouchableWithoutFeedback onPress={() => props.item.onPressAction && props.item.onPressAction()}>
            <View style={[styles.container, globalStyles.shadow]}>
               <View style={styles.textContainer}>
                  <Label text={props.item.name} size={24} color={colors.primary} />
                  <Label text={props.item.description} />
               </View>
               {props.item.icon}
            </View>
         </TouchableWithoutFeedback>
      </Swipeable>
   )
}

export default ListItem;