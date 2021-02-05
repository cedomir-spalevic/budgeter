import { TextField } from "components";
import { useTheme } from "context";
import React, { useState, useEffect, useRef } from "react";
import Picker from "react-native-picker";
import { hexToRGBA } from "services/internal/colors";

interface Props {
   value?: string;
   errorMessage?: string;
   placeholder?: string;
   items: string[];
   onChange?: (newText: string) => void;
   preRenderIcon?: JSX.Element;
   onPreRenderIconClick?: () => void;
   postRenderIcon?: JSX.Element;
   onPostRenderIconClick?: () => void;
}

const PickerSelect: React.FC<Props> = (props: Props) => {
   const selected = useRef<string | null>(null);
   const [value, setValue] = useState<string>();
   const theme = useTheme();

   const onConfirm = (v: any) => {
      let newValue = selected.current !== null ? selected.current : !v ? props.items[0] : v;
      setValue(newValue);
      selected.current = null;
      if(props.onChange)
         props.onChange(newValue);
   }

   const showPicker = () => {
      Picker.init({
         pickerTitleText: props.placeholder ?? "",
         pickerTitleColor: hexToRGBA(theme.value.palette.textColor),
         pickerData: props.items,
         selectedValue: value ? [value] : [""],
         onPickerConfirm: (item: string[]) => onConfirm(item[0]),
         onPickerCancel: (item: string[]) => selected.current = null,
         onPickerSelect: (item: string[]) => selected.current = item[0],
         pickerConfirmBtnText: "Select",
         pickerConfirmBtnColor: hexToRGBA(theme.value.palette.primary),
         pickerCancelBtnText: "Cancel",
         pickerCancelBtnColor: hexToRGBA(theme.value.palette.primary),
         pickerToolBarBg: hexToRGBA(theme.value.palette.cardColor),
         pickerFontColor: hexToRGBA(theme.value.palette.textColor),
         pickerFontSize: theme.value.font.regularSize,
         pickerBg: hexToRGBA(theme.value.palette.tabBarColor)
      });
      Picker.show();
   }

   useEffect(() => {
      if(props.value && value === undefined)
         setValue(props.value);
   })

   return (
      <TextField
         preRenderIcon={props.preRenderIcon}
         postRenderIcon={props.postRenderIcon}
         placeholder={props.placeholder}
         contextMenuHidden={true}
         editable={false}
         value={value}
         returnKeyType="done"
         onTouchStart={() => showPicker()}
         errorMessage={props.errorMessage}
         controlled
      />
   )
}

export default PickerSelect;