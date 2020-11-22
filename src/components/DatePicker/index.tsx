import React, { useState, useEffect } from "react";
import {
   View,
   Text,
   TextInput
} from "react-native";
import { globalStyles } from "styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDate } from "services/utils/datetime";
import { Icon } from "components";

interface Props {
   preRenderIcon?: JSX.Element;
   postRenderIcon?: JSX.Element;
   placeholder: string;
   errorMessage?: string;
   date?: Date;
   onChange?: (newDate: Date) => void;
}

const DatePicker: React.FC<Props> = (props: Props) => {
   const [visible, setVisible] = useState<boolean>(false);
   const [date, setDate] = useState<Date>();

   const onConfirm = (newDate: Date) => {
      setDate(newDate);
      setVisible(false);
      if (props.onChange)
         props.onChange(newDate);
   }

   useEffect(() => {
      if (props.date && date === undefined)
         setDate(props.date);
   })
   return (
      <View>
         <View style={globalStyles.textInputContainer}>
            {props.preRenderIcon &&
               React.cloneElement(props.preRenderIcon, { style: globalStyles.textInputIconStyles })}
            <TextInput
               style={date === undefined ? globalStyles.textInput : globalStyles.textInput}
               placeholder={props.placeholder}
               value={date === undefined ? "" : formatDate(date)}
               editable={false}
               onTouchStart={() => setVisible(true)}
            />
            {props.postRenderIcon &&
               React.cloneElement(props.postRenderIcon, { style: globalStyles.textInputIconStyles })}
            {props.errorMessage &&
               <Icon
                  name="error"
                  style={globalStyles.errorIcon}
               />}
         </View>
         {props.errorMessage &&
            <Text style={globalStyles.errorMessage}>{props.errorMessage}</Text>}
         <DateTimePickerModal
            date={date}
            isVisible={visible}
            onConfirm={(d) => onConfirm(d)}
            onCancel={() => setVisible(false)}
         />
      </View>
   )
}

export default DatePicker;