import { TextField } from "components";
import { useTheme } from "context";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import Picker from "react-native-picker";
import { hexToRGBA } from "services/internal/colors";

export interface PickerSelectRef {
   showPicker: () => void;
}

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
   pickerSelectRef?: React.Ref<PickerSelectRef>;
}

const PickerSelect: React.FC<Props> = (props: Props) => {
   const selected = useRef<string | null>(null);
   const [value, setValue] = useState<string>();
   const pickerSelectRef = useRef<PickerSelectRef>({ showPicker: () => showPicker() });
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
         pickerToolBarBg: hexToRGBA(theme.value.palette.secondaryBackground),
         pickerFontColor: hexToRGBA(theme.value.palette.textColor),
         pickerFontSize: theme.value.font.regularSize,
         pickerBg: hexToRGBA(theme.value.palette.secondaryBackground)
      });
      Picker.show();
   }

   useEffect(() => {
      if(props.value && value === undefined)
         setValue(props.value);
      if(props.pickerSelectRef) {
         (props.pickerSelectRef as React.MutableRefObject<PickerSelectRef>).current = pickerSelectRef.current;
      }
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
         onFocus={() => alert("here")}
         errorMessage={props.errorMessage}
         controlled
      />
   )
}

export default forwardRef<PickerSelectRef, Props>((props, ref) => <PickerSelect pickerSelectRef={ref} {...props} />);