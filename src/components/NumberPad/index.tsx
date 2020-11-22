import React, { useState, useEffect } from "react";
import { toCurrency, toNumber } from "services/utils/currency";
import { View, TextInput, Text } from "react-native";
import { globalStyles } from "styles";
import { Icon } from "components";

interface Props {
   value?: number;
   preRenderIcon?: JSX.Element;
   postRenderIcon?: JSX.Element;
   placeholder?: string;
   errorMessage?: string;
   onChange?: (newNumber: number) => void;
}

const NumberPad: React.FC<Props> = (props: Props) => {
   const [value, setValue] = useState<number>();
   const [formattedValue, setFormattedValue] = useState<string>();

   const format = () => {
      if (formattedValue) {
         let number = toNumber(formattedValue);
         let currency = toCurrency(number);
         setValue(number);
         setFormattedValue(currency);
         if (props.onChange)
            props.onChange(number);
      }
   }

   useEffect(() => {
      if (props.value && !value) {
         setValue(props.value);
         setFormattedValue(toCurrency(props.value));
      }
   })

   return (
      <View>
         <View style={globalStyles.textInputContainer}>
            {props.preRenderIcon &&
               React.cloneElement(props.preRenderIcon, { style: globalStyles.textInputIconStyles })}
            <TextInput
               placeholder={props.placeholder}
               keyboardAppearance="dark"
               keyboardType="numeric"
               style={globalStyles.textInput}
               value={formattedValue}
               onChangeText={nv => setFormattedValue((nv === undefined ? "" : nv))}
               onBlur={() => format()}
               returnKeyType="done"
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

export default NumberPad;