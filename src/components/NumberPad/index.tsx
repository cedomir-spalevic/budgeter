import useMergedRef from "@react-hook/merged-ref";
import { Label, TextField } from "components";
import { makeStyles } from "context";
import React, {
   useState,
   useEffect,
   forwardRef,
   useRef,
   MutableRefObject
} from "react";
import {
   TextInput,
   NativeSyntheticEvent,
   TextInputKeyPressEventData,
   TextStyle
} from "react-native";
import { toCurrency } from "services/internal/currency";

const useStyles = makeStyles((theme) => ({
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
      marginBottom: 5
   },
   inputWithError: {
      borderBottomColor: theme.palette.red
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
      color: theme.palette.systemGray
   },
   errorText: {
      color: theme.palette.red
   }
}));

interface Props {
   value?: number;
   hidden?: boolean;
   errorMessage?: string;
   onChange: (num: number) => void;
   autoFocus?: boolean;
   placeholder?: string;
   preRenderIcon?: JSX.Element;
   onPreRenderIconClick?: () => void;
   postRenderIcon?: JSX.Element;
   onPostRenderIconClick?: () => void;
   textInputRef?:
      | MutableRefObject<TextInput | null>
      | ((instance: TextInput | null) => void)
      | null;
   onSubmit?: () => void;
   inputStyles?: TextStyle;
}

const NumberPad: React.FC<Props> = (props: Props) => {
   const [num, setNum] = useState<string>(toCurrency(0));
   const styles = useStyles();
   const textInput = useRef<TextInput>();
   const mergedRefs = useMergedRef<TextInput | undefined>(
      textInput,
      props.textInputRef!
   );
   const inputStyles = [styles.input];
   if (props.errorMessage) {
      inputStyles.push(styles.inputWithError);
   }

   const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
      if (e.cancelable) {
         const numStr = num.substr(1).replaceAll(".", "").replaceAll(",", "");
         if (numStr === "000" && e.nativeEvent.key === "Backspace") {
            e.preventDefault();
            e.stopPropagation();
         }
      }
   };

   const onChange = (newValue: string) => {
      const numStr = newValue.substr(1).replaceAll(".", "").replaceAll(",", "");
      const amount = Number(numStr ?? "") / 100;
      setNum(toCurrency(amount));
      props.onChange(amount);
   };

   useEffect(() => {
      if (props.value) setNum(toCurrency(props.value));
      else setNum(toCurrency(0));
   }, []);

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
         value={num}
         onChange={onChange}
         onKeyPress={onKeyPress}
         ref={mergedRefs}
         onSubmit={() => props.onSubmit && props.onSubmit()}
         returnKeyType="done"
         controlled
         renderInput={() => <Label type="regular" text={num} />}
         blurOnSubmit={true}
         inputStyles={props.inputStyles}
      />
   );
};

export default forwardRef<TextInput, Props>(
   (
      props,
      ref:
         | ((instance: TextInput | null) => void)
         | MutableRefObject<TextInput | null>
         | null
         | undefined = undefined
   ) => <NumberPad textInputRef={ref} {...props} />
);
