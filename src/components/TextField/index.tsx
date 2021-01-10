import useMergedRef from "@react-hook/merged-ref";
import { makeStyles, useTheme } from "context";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import {
   View,
   TextInput,
   TouchableOpacity,
   Text,
   NativeSyntheticEvent,
   TextInputSubmitEditingEventData,
   ShadowPropTypesIOS
} from "react-native";

const useStyles = makeStyles(theme => ({
   container: {
      flexDirection: "column",
      width: "100%"
   },
   input: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderBottomColor: "#e0e0e0",
      marginBottom: 5,
   },
   inputWithError: {
      borderBottomColor: theme.palette.error
   },
   inputContainer: {
      flexDirection: "row",
      flex: 1
   },
   textInput: {
      fontSize: theme.font.regularSize,
      fontFamily: theme.font.fontFamily,
      color: theme.palette.textColor
   },
   icon: {
      fontSize: 18,
      width: 25,
      color: theme.palette.gray,
      resizeMode: "contain"
   },
   errorText: {
      color: theme.palette.error
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
   onSubmit?: () => void;
   textInputRef?: React.MutableRefObject<TextInput> | ((instance: TextInput) => void)
}

const TextField: React.FC<Props> = (props: Props) => {
   const textInput = useRef<TextInput>();
   const mergedRefs = useMergedRef<TextInput>(textInput, props.textInputRef)
   const [value, setValue] = useState<string>();
   const styles = useStyles();
   const theme = useTheme();
   const inputStyles = [styles.input];
   if(props.errorMessage) {
      inputStyles.push(styles.inputWithError);
   }

   const onChange = (input?: string) => {
      let newValue = (input === undefined ? "" : input);
      setValue(newValue);
      if(props.onChange)
         props.onChange(newValue);
   }

   const onSubmitEditing = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      event.preventDefault();
      if(props.onSubmit)
         props.onSubmit();
   }

   const onContainerPress = () => {
      if(textInput.current)
         textInput.current.focus();
   }

   useEffect(() => {
      if (props.value && value === undefined)
         setValue(props.value);
   })

   return (
      <View style={styles.container} onTouchStart={() => onContainerPress()}>
         <View style={inputStyles}>
            <View style={styles.inputContainer}>
               {props.preRenderIcon && (
                  <TouchableOpacity onPress={props.onPreRenderIconClick}>
                     {React.cloneElement(props.preRenderIcon, { style: styles.icon })}
                  </TouchableOpacity> )}
               <TextInput
                  placeholder={props.placeholder}
                  placeholderTextColor={theme.value.palette.gray}
                  autoFocus={props.autoFocus}
                  onChangeText={onChange}
                  secureTextEntry={props.hidden}
                  onSubmitEditing={onSubmitEditing}
                  ref={mergedRefs}
                  style={styles.textInput}
                  blurOnSubmit={false}
                  keyboardAppearance={theme.kind === "dark" ? "dark" : "light"}
               />
            </View>
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

export default forwardRef<TextInput, Props>((props, ref) => <TextField textInputRef={ref} {...props} />);