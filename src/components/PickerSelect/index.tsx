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

const useStyles = makeStyles(theme => ({
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
      color: theme.palette.gray,
      resizeMode: "contain"
   }
}))

interface Props {
   value?: string;
   errorMessage?: string;
   placeholder?: string;
   items: { label: string; value: string }[];
   onChange?: (newText: string) => void;
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

   return (
      <View style={styles.container}>
          {props.preRenderIcon && (
              <TouchableOpacity onPress={props.onPreRenderIconClick}>
                {React.cloneElement(props.preRenderIcon, { style: styles.icon })}
              </TouchableOpacity> )}
          <RNPickerSelect
            placeholder={{ label: props.placeholder, value: null, color: "#9EA0A4" }}
            style={{ viewContainer: { width: "80%" }, inputIOS: { color: theme.value.palette.textColor } }}
            onValueChange={v => console.log(v)}
            items={props.items}
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