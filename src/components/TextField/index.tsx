import useMergedRef from "@react-hook/merged-ref";
import { makeStyles, useScroll, useTheme } from "context";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import {
   View,
   TextInput,
   TouchableOpacity,
   Text,
   NativeSyntheticEvent,
   TextInputSubmitEditingEventData,
   TextInputKeyPressEventData
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
      color: theme.palette.textColor,
      flex: 1
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
   textInputRef?: React.MutableRefObject<TextInput> | ((instance: TextInput) => void);
   autoCapitalize?: "none" | "sentences" | "words" | "characters";
   textContentType?: "password" | "newPassword" | "name" | "emailAddress";
   keyboardType?: "email-address" | "number-pad";
   onFocus?: () => void;
   onBlur?: () => void;
   editable?: boolean;
   contextMenuHidden?: boolean;
   onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
   returnKeyType?: "done";
   onTouchStart?: () => void;
   preventOnChange?: boolean;
   controlled?: boolean;
}

const TextField: React.FC<Props> = (props: Props) => {
   const scroll = useScroll();
   const y = useRef<number>();
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

   const onPreRenderIconClick = () => {
      if(props.onPreRenderIconClick)
         props.onPreRenderIconClick();
      textInput.current.focus();
   }

   const onPostRenderIconClick = () => {
      if(props.onPostRenderIconClick)
         props.onPostRenderIconClick();
      textInput.current.focus();
   }

   const onFocus = () => {
      scroll.to(y.current);
      if(props.onFocus)
         props.onFocus();
   }

   const onBlur = () => {
      if(props.onBlur)
         props.onBlur();
   }

   useEffect(() => {
      if (props.controlled || (props.value && value === undefined)) {
         setValue(props.value);
      }
   })

   return (
      <View style={styles.container} onTouchStart={() => onContainerPress()} onLayout={e => (y.current = e.nativeEvent.layout.y)}>
         <View style={inputStyles}>
            <View style={styles.inputContainer}>
               {props.preRenderIcon && (
                  <TouchableOpacity onPress={onPreRenderIconClick}>
                     {React.cloneElement(props.preRenderIcon, { style: styles.icon })}
                  </TouchableOpacity> )}
               <TextInput
                  editable={props.editable}
                  contextMenuHidden={props.contextMenuHidden}
                  value={value}
                  placeholder={props.placeholder}
                  placeholderTextColor={theme.value.palette.gray}
                  autoFocus={props.autoFocus}
                  onChangeText={props.preventOnChange ? undefined : onChange}
                  secureTextEntry={props.hidden}
                  onSubmitEditing={onSubmitEditing}
                  ref={mergedRefs}
                  style={styles.textInput}
                  blurOnSubmit={false}
                  keyboardAppearance={theme.kind === "dark" ? "dark" : "light"}
                  autoCapitalize={props.autoCapitalize}
                  textContentType={props.textContentType}
                  keyboardType={props.keyboardType}
                  onFocus={e => onFocus()}
                  onBlur={e => onBlur()}
                  onKeyPress={props.onKeyPress}
                  returnKeyType={props.returnKeyType}
                  onTouchStart={props.onTouchStart}
               />
            </View>
            {props.postRenderIcon && (
               <TouchableOpacity onPress={onPostRenderIconClick}>
                  {React.cloneElement(props.postRenderIcon, { style: styles.icon })}
               </TouchableOpacity> )}
         </View>
         {props.errorMessage &&
            <Text style={styles.errorText}>{props.errorMessage}</Text> }
      </View>
   )
}

export default forwardRef<TextInput, Props>((props, ref) => <TextField textInputRef={ref} {...props} />);