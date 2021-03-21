import React from "react";
import { View, TextStyle, ActivityIndicator } from "react-native";
import { useTheme } from "context";

interface Props {
   activated?: boolean;
   side: "left" | "right";
   color: string;
   icon: JSX.Element;
}

const SwipeContainer: React.FC<Props> = (props: Props) => {
   const theme = useTheme();
   const styles: TextStyle = {
      height: 65,
      backgroundColor: props.color,
      flexDirection: "row",
      alignItems: "center"
   };
   if (props.side === "left") {
      styles.justifyContent = "flex-end";
      styles.paddingRight = 20;
   } else {
      styles.justifyContent = "flex-start";
      styles.paddingLeft = 20;
   }
   return (
      <View style={styles}>
         {props.activated ? (
            <ActivityIndicator color={theme.value.palette.white} />
         ) : (
            props.icon
         )}
      </View>
   );
};

export default SwipeContainer;
