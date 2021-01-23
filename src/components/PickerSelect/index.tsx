import { TextField } from "components";
import { useTheme } from "context";
import React, { useState, useEffect } from "react";
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
   const [value, setValue] = useState<string>();
   const theme = useTheme();

   const onChange = (v: any) => {
      setValue(v);
      if(props.onChange)
         props.onChange(v);
   }

   const showPicker = () => {
      Picker.init({
         pickerTitleText: props.placeholder ?? "",
         pickerTitleColor: hexToRGBA(theme.value.palette.textColor),
         pickerData: props.items,
         selectedValue: value ? [value] : [""],
         onPickerConfirm: (item: string[]) => {
            onChange(item[0])
         },
         onPickerCancel: (item: string[]) => null,
         onPickerSelect: (item: string[]) => null,
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
      />
   )
}

export default PickerSelect;