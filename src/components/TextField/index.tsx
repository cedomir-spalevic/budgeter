import React, { useState, useEffect } from "react";
import {
   View,
   TextInput,
   Text
} from "react-native";
import { globalStyles } from "styles";
import { Icon } from "components";

interface Props {
   value?: string;
   preRenderIcon?: JSX.Element;
   postRenderIcon?: JSX.Element;
   placeholder?: string;
   hidden?: boolean;
   errorMessage?: string;
   onChange?: (newText: string) => void;
}

const TextField: React.FC<Props> = (props: Props) => {
   const [value, setValue] = useState<string>();

   const onChange = (input?: string) => {
      let newValue = (input === undefined ? "" : input);
      setValue(newValue);
      if(props.onChange)
         props.onChange(newValue);
   }

   useEffect(() => {
      if (props.value && value === undefined)
         setValue(props.value);
   })

   return (
      <View>
         <View style={globalStyles.textInputContainer}>
            {props.preRenderIcon &&
               React.cloneElement(props.preRenderIcon, { style: globalStyles.textInputIconStyles })}
            <TextInput
               placeholder={props.placeholder}
               secureTextEntry={props.hidden}
               keyboardAppearance="dark"
               style={globalStyles.textInput}
               value={value}
               onChangeText={onChange}
            />
            {props.postRenderIcon &&
               React.cloneElement(props.postRenderIcon, { style: globalStyles.textInputIconStyles })}
            {props.errorMessage &&
               <Icon name="error" style={globalStyles.errorIcon} />}
         </View>
         {props.errorMessage &&
            <Text style={globalStyles.errorMessage}>{props.errorMessage}</Text>}
      </View>
   )
}

export default TextField;