import { makeStyles, useTheme } from "context";
import React from "react";
import { Animated, View } from "react-native";
import { Icon } from "components";
import { StackHeaderProps } from "./types";

const useStyles = makeStyles((theme) => ({
   container: {
      position: "relative",
      height: 100,
      backgroundColor: theme.palette.appBackground
   },
   containerBackground: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: theme.palette.tabBarBackground,
      borderBottomWidth: 0.5,
      borderBottomColor: theme.palette.tabBarBackground,
      opacity: 0
   },
   header: {
      height: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: theme.size.pagePadding
   },
   animationTitle: {
      paddingTop: 50,
      position: "relative",
      width: 150,
      overflow: "hidden",
      marginTop: 30
   },
   actions: {
      paddingTop: 50,
      width: 75
   },
   actionLeft: {
      alignItems: "flex-start",
      justifyContent: "flex-start"
   },
   actionRight: {
      alignItems: "flex-end",
      justifyContent: "flex-end"
   }
}));

interface Props {
   isModal?: boolean;
}

const Header: React.FC<Props & StackHeaderProps> = (
   props: Props & StackHeaderProps
) => {
   const styles = useStyles();
   const theme = useTheme();
   const showBackBtn = props.navigation.dangerouslyGetState().index > 0;
   const headerTitle = props.scene.descriptor.options.headerTitle;
   const headerTitleNode =
      headerTitle &&
      typeof headerTitle === "function" &&
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      headerTitle({ onLayout: () => {} });
   const headerLeft = props.scene.descriptor.options.headerLeft;
   const leftActions =
      headerLeft && headerLeft({ tintColor: theme.value.palette.primary });
   const headerRight = props.scene.descriptor.options.headerRight;
   const rightActions =
      headerRight && headerRight({ tintColor: theme.value.palette.primary });
   const extraContainerBackgroundStyle =
      props.scene.descriptor.options.containerBackground;
   const containerBackgroundStyles = [
      styles.containerBackground,
      extraContainerBackgroundStyle
   ];

   const closeModal = () => {
      if (showBackBtn) props.navigation.popToTop();
      props.navigation.goBack();
   };

   return (
      <View style={styles.container}>
         <Animated.View style={containerBackgroundStyles}></Animated.View>
         <View style={styles.header}>
            <View style={[styles.actions, styles.actionLeft]}>
               {showBackBtn && (
                  <Icon
                     name="chevron-left"
                     size={32}
                     color={theme.value.palette.primary}
                     onPress={() => props.navigation.goBack()}
                  />
               )}
               {leftActions}
            </View>
            <View style={styles.animationTitle}>{headerTitleNode}</View>
            <View style={[styles.actions, styles.actionRight]}>
               {rightActions}
               {props.isModal && (
                  <Icon
                     name="close"
                     size={32}
                     color={theme.value.palette.primary}
                     onPress={() => closeModal()}
                  />
               )}
            </View>
         </View>
      </View>
   );
};

export default Header;
