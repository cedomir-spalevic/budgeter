import { makeStyles, useTheme } from "context";
import React, { useState, useRef } from "react";
import {
   View,
   TextInput,
   TouchableOpacity,
   NativeSyntheticEvent,
   TextInputKeyPressEventData
} from "react-native";
import { toCurrency } from "services/internal/currency";
import RNPickerSelect from "react-native-picker-select";

const useStyles = makeStyles(palette => ({
   container: {
      paddingVertical: 10,
      borderBottomWidth: 2,
      borderBottomColor: "#e0e0e0",
      flexDirection: "row",
      marginBottom: 10,
      width: "100%"
   },
   icon: {
      fontSize: 18,
      width: 25,
      color: palette.gray,
      resizeMode: "contain"
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

const PickerSelect: React.FC<Props> = (props: Props) => {
    const isBackspace = useRef<boolean>(false);
    const [num, setNum] = useState<string>("");
    const [enteredValue, setEnteredValue] = useState<string>();
    const styles = useStyles();
    const theme = useTheme();

    const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        let numStr = num.toString().replace(".", "");
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
    }

   return (
      <View style={styles.container}>
          {props.preRenderIcon && (
              <TouchableOpacity onPress={props.onPreRenderIconClick}>
                {React.cloneElement(props.preRenderIcon, { style: styles.icon })}
              </TouchableOpacity> )}
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={theme.pallette.gray}
            autoFocus={props.autoFocus}
            contextMenuHidden={true}
            keyboardType="number-pad"
            style={{ width: "80%" }}
            value={toCurrency(Number(num)/100)}
            onKeyPress={onKeyPress}
          />
          <RNPickerSelect
            onValueChange={v => console.log(v)}
            items={[ { label: "Football", value: "F" }]}
          />
          {props.postRenderIcon && (
             <TouchableOpacity onPress={props.onPostRenderIconClick}>
                {React.cloneElement(props.postRenderIcon, { style: styles.icon })}
             </TouchableOpacity> )}
         {/* {props.errorMessage &&
            <Text style={globalStyles.errorMessage}>{props.errorMessage}</Text> } */}
      </View>
   )
}

export default PickerSelect;