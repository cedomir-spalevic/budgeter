import { Link, TextField } from "components";
import { makeStyles, useTheme } from "context";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Picker } from "@react-native-picker/picker";
import { Animated, Modal, View } from "react-native";

const useStyles = makeStyles(theme => ({
   overlay: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.black
   },
   actionSheet: {
      flex: 1, 
      justifyContent: "flex-end"
   },
   actionSheetHeader: {
      width: "100%", 
      justifyContent: "space-between", 
      flexDirection: "row", 
      paddingHorizontal: theme.size.pagePadding, 
      paddingVertical: 15,
      borderBottomColor: theme.palette.systemGray4,
      borderBottomWidth: 1
   },
   actionSheetBody: {
      width: "100%",
      flexDirection: "column",
      backgroundColor: theme.palette.secondaryBackground,
      borderRadius: 10
   },
   picker: {
      width: "100%",
      padding: 0,
      margin: 0
   },
   pickerItem: {
      color: theme.palette.textColor
   }
}))

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
   const [visible, setVisible] = useState<boolean>(false);
   const [value, setValue] = useState<string>();
   const [pickerValue, setPickerValue] = useState<string>();
   const pickerSelectRef = useRef<PickerSelectRef>({ showPicker: () => setVisible(true) });
   const overlayOpacity = useRef<Animated.Value>(new Animated.Value(0));
   const theme = useTheme();
   const styles = useStyles();

   const onConfirm = () => {
      if(!pickerValue)
         setValue(props.items[0])
      else
         setValue(pickerValue);
      setVisible(false);
      if(props.onChange)
         props.onChange(pickerValue);
   }

   const onCancel = () => {
      setPickerValue(undefined);
      setVisible(false);
   }

   useEffect(() => {
      Animated.timing(
         overlayOpacity.current,
         {
            toValue: visible ? 0.4 : 0,
            duration: 275,
            useNativeDriver: false
         }
      ).start(e => {
      });
   }, [visible])

   useEffect(() => {
      if(props.value && value === undefined)
         setValue(props.value);
      if(props.pickerSelectRef) {
         (props.pickerSelectRef as React.MutableRefObject<PickerSelectRef>).current = pickerSelectRef.current;
      }
   })

   return (
      <>
         <TextField
            preRenderIcon={props.preRenderIcon}
            postRenderIcon={props.postRenderIcon}
            placeholder={props.placeholder}
            contextMenuHidden={true}
            editable={false}
            value={value}
            returnKeyType="done"
            onTouchStart={() => setVisible(true)}
            errorMessage={props.errorMessage}
            controlled
         />
         <Modal
            animationType="none"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
         >
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity.current }]}></Animated.View>
            <View style={styles.actionSheet}>
               <View style={styles.actionSheetBody}>
                  <View style={styles.actionSheetHeader}>
                     <Link text="Cancel" onPress={() => onCancel()} />
                     <Link text="Confirm" onPress={() => onConfirm()} />
                  </View>
                  <Picker style={styles.picker} itemStyle={styles.pickerItem} selectedValue={pickerValue} onValueChange={(v, i) => setPickerValue(v)}>
                     {props.items.map(x => <Picker.Item label={x} value={x} />)}
                  </Picker>
               </View>
            </View>
         </Modal>
      </>
   )
}

export default forwardRef<PickerSelectRef, Props>((props, ref) => <PickerSelect pickerSelectRef={ref} {...props} />);