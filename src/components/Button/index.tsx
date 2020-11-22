import React from "react";
import {
   TouchableOpacity,
   Text,
   StyleSheet,
   ViewStyle
} from "react-native";
import { colors } from "styles";

const styles = StyleSheet.create({
   buttonStyles: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 5,
      shadowColor: colors.secondaryDarker,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.8,
      shadowRadius: 3
   },
   textStyles: {
      color: colors.white,
      fontSize: 22,
      textAlign: "center"
   }
})

interface Props {
   onPress: () => void;
   text?: string;
   children?: React.ReactNode;
   theme?: "primary" | "secondary" | "error";
}

const Button: React.FC<Props> = (props: Props) => {
   let themeStyles: ViewStyle = {};
   if (props.theme === undefined || props.theme === "primary") {
      themeStyles.backgroundColor = colors.primary;
   }
   else if (props.theme === "error") {
      themeStyles.backgroundColor = colors.red;
   }
   return (
      <TouchableOpacity style={[styles.buttonStyles, themeStyles]} onPress={props.onPress}>
         {props.text &&
            <Text style={styles.textStyles}>
               {props.text}
            </Text>}
         {props.children}
      </TouchableOpacity>
   )
}

export default Button;