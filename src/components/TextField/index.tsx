import React, { useState, useEffect } from "react";
import {
   View,
   TextInput,
   Text
} from "react-native";
import { globalStyles } from "styles";
import { Icon } from "components";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
   value?: string;
   preRenderIcon?: JSX.Element;
   onPreRenderIconClick?: () => void;
   postRenderIcon?: JSX.Element;
   onPostRenderIconClick?: () => void;
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
            {props.preRenderIcon && (
               <TouchableOpacity onPress={props.onPreRenderIconClick}>
                  {React.cloneElement(props.preRenderIcon, { style: globalStyles.textInputIconStyles })}
               </TouchableOpacity>
            )}
            <TextInput
               placeholder={props.placeholder}
               secureTextEntry={props.hidden}
               keyboardAppearance="dark"
               style={globalStyles.textInput}
               value={value}
               onChangeText={onChange}
               onBlur={() => onChange(value)}
            />
            {props.postRenderIcon && (
               <TouchableOpacity onPress={props.onPostRenderIconClick}>
                  {React.cloneElement(props.postRenderIcon, { style: globalStyles.textInputIconStyles })}
               </TouchableOpacity>
            )}
            {props.errorMessage &&
               <Icon name="error" style={globalStyles.errorIcon} />}
         </View>
         {props.errorMessage &&
            <Text style={globalStyles.errorMessage}>{props.errorMessage}</Text>}
      </View>
   )
}

export default TextField;