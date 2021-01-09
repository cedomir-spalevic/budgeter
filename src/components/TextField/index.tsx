import { makeStyles, useTheme } from "context";
import React, { useState, useEffect } from "react";
import {
   View,
   TextInput,
   TouchableOpacity,
   Text
} from "react-native";

const useStyles = makeStyles(palette => ({
   container: {
      flexDirection: "column",
      width: "100%"
   },
   input: {
      flexDirection: "row",
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderBottomColor: "#e0e0e0",
      marginBottom: 10,
   },
   inputWithError: {
      borderBottomColor: palette.error
   },
   icon: {
      fontSize: 18,
      width: 25,
      color: palette.gray,
      resizeMode: "contain"
   },
   errorText: {
      color: palette.error
   }
}))

interface Props {
   value?: string;
   hidden?: boolean;
   errorMessage?: string;
   onChange?: (newText: string) => void;
   autoFocus?: boolean;
   placeholder?: string;
   preRenderIcon?: JSX.Element;
   onPreRenderIconClick?: () => void;
   postRenderIcon?: JSX.Element;
   onPostRenderIconClick?: () => void;
}

const TextField: React.FC<Props> = (props: Props) => {
   const [value, setValue] = useState<string>();
   const styles = useStyles();
   const theme = useTheme();
   const inputStyles = [styles.input];
   if(props.errorMessage)
      inputStyles.push(styles.inputWithError);

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
      <View style={styles.container}>
         <View style={inputStyles}>
            {props.preRenderIcon && (
               <TouchableOpacity onPress={props.onPreRenderIconClick}>
                  {React.cloneElement(props.preRenderIcon, { style: styles.icon })}
               </TouchableOpacity> )}
            <TextInput
               placeholder={props.placeholder}
               placeholderTextColor={theme.pallette.gray}
               autoFocus={props.autoFocus}
               onChangeText={onChange}
               style={{ width: "80%" }}
            />
            {props.postRenderIcon && (
               <TouchableOpacity onPress={props.onPostRenderIconClick}>
                  {React.cloneElement(props.postRenderIcon, { style: styles.icon })}
               </TouchableOpacity> )}
         </View>
         {props.errorMessage &&
            <Text style={styles.errorText}>{props.errorMessage}</Text> }
      </View>
   )
}

export default TextField;