import useMergedRef from "@react-hook/merged-ref";
import { TextField } from "components";
import { makeStyles, useTheme } from "context";
import React, { useState, useEffect, forwardRef, useRef } from "react";
import {
   TextInput,
   NativeSyntheticEvent,
   TextInputKeyPressEventData
} from "react-native";
import { toCurrency } from "services/internal/currency";

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
   value?: number;
   hidden?: boolean;
   errorMessage?: string;
   onChange: (num: string) => void;
   autoFocus?: boolean;
   placeholder?: string;
   preRenderIcon?: JSX.Element;
   onPreRenderIconClick?: () => void;
   postRenderIcon?: JSX.Element;
   onPostRenderIconClick?: () => void;
   textInputRef?: React.MutableRefObject<TextInput> | ((instance: TextInput) => void);
   onSubmit?: () => void;
}

const NumberPad: React.FC<Props> = (props: Props) => {
    const [num, setNum] = useState<string>();
    const styles = useStyles();
    const theme = useTheme();
    const textInput = useRef<TextInput>();
    const mergedRefs = useMergedRef<TextInput>(textInput, props.textInputRef)
    const inputStyles = [styles.input];
    if(props.errorMessage) {
       inputStyles.push(styles.inputWithError);
    }

    const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        let numStr = num ? num.toString().replace(".", "") : "";
        while(numStr.charAt(0) === "0")
            numStr = numStr.substring(1);
        if(e.nativeEvent.key === "Backspace") {
            if(!numStr) 
                return;
            if(numStr.length === 1) {
                setNum("")
                return;
            }
            numStr = numStr.substring(0, numStr.length - 1);
        }
        else {
            numStr += e.nativeEvent.key;
        }
        setNum(numStr);
        props.onChange(numStr)
    }

    useEffect(() => {
        if(props.value && num === undefined)
            setNum((props.value * 100).toString());
    })

   return (
       <TextField
            preRenderIcon={props.preRenderIcon}
            onPreRenderIconClick={props.onPreRenderIconClick}
            postRenderIcon={props.postRenderIcon}
            onPostRenderIconClick={props.onPostRenderIconClick}
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            contextMenuHidden={true}
            keyboardType="number-pad"
            errorMessage={props.errorMessage}
            value={toCurrency(Number(num ?? "")/100)}
            onKeyPress={onKeyPress}
            ref={mergedRefs}
            onSubmit={() => props.onSubmit && props.onSubmit()}
            returnKeyType="done"
            preventOnChange
            controlled
       />
   )
}

export default forwardRef<TextInput, Props>((props, ref) => <NumberPad textInputRef={ref} {...props} />);