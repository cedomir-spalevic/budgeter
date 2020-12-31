import React from "react";
import {
   TouchableOpacity,
   StyleSheet
} from "react-native";
import { colors } from "styles";
import Label from "components-new/Label";

const styles = StyleSheet.create({
   button: {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 30,
      paddingRight: 30,
      borderRadius: 10,
      backgroundColor: colors.primary,
      alignItems: "center"
   }
})

interface Props {
    onPress: () => void;
    text: string;
}

const Button: React.FC<Props> = (props: Props) => {
    return (
        <TouchableOpacity style={[styles.button]} onPress={props.onPress}>
            <Label type="regular" text={props.text} color={colors.white} />
        </TouchableOpacity>
    )
}

export default Button;