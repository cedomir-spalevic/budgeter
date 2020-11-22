import React from "react";
import { Text, TextStyle } from "react-native";
import { labelStyles } from "styles";

interface Props {
   text: string;
   type?: "header" | "shadow" | "normal";
   size?: number;
   color?: string;
}

const Label: React.FC<Props> = (props: Props) => {
   let theme: TextStyle = {};
   if (props.type) {
      if (props.type === "header")
         theme = labelStyles.header;
      else if (props.type === "shadow")
         theme = labelStyles.shadow;
   }
   else {
      if (props.size)
         theme.fontSize = props.size;
      if (props.color)
         theme.color = props.color;
   }
   return (
      <Text style={[labelStyles.label, theme]}>
         {props.text}
      </Text>
   )
}

export default Label;