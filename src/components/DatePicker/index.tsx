import React, { useState, useEffect, forwardRef, useRef } from "react";
import RNDatePicker from "react-native-date-picker";
import moment from "moment";
import { Link, TextField, Label } from "components";
import { makeStyles, useTheme } from "context";
import { Animated, View, Modal, Dimensions } from "react-native";

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
      justifyContent: "flex-end", 
      alignItems: "center", 
      marginBottom: 30,
      marginHorizontal: Dimensions.get("screen").width * .03
   },
   actionSheetBodyContainer: {
      width: "100%",
      flexDirection: "column",
      backgroundColor: theme.palette.secondaryBackground,
      marginBottom: 10,
      borderRadius: 10
   },
   datePickerHeaderContainer: {
      width: "100%",
      paddingVertical: 15,
      alignItems: "center",
      borderBottomColor: theme.palette.systemGray4,
      borderBottomWidth: 1
   },
   datePickerContainer: {
      alignItems: "center"
   },
   datePickerConfirmContainer: {
      width: "100%",
      paddingVertical: 15,
      alignItems: "center",
      borderTopColor: theme.palette.systemGray4,
      borderTopWidth: 1
   },
   cancelContainer: {
      width: "100%", 
      backgroundColor: theme.palette.secondaryBackground, 
      paddingVertical: 15, 
      borderRadius: 10, 
      justifyContent: "center", 
      alignItems: "center"
   }
}))

export interface DatePickerRef {
   showPicker: () => void;
}

interface Props {
   value?: Date;
   hidden?: boolean;
   errorMessage?: string;
   onChange?: (date: Date) => void;
   autoFocus?: boolean;
   placeholder?: string;
   preRenderIcon?: JSX.Element;
   onPreRenderIconClick?: () => void;
   postRenderIcon?: JSX.Element;
   onPostRenderIconClick?: () => void;
   datePickerRef?: React.Ref<DatePickerRef>;
}

const DatePicker: React.FC<Props> = (props: Props) => {
   const [value, setValue] = useState<Date>();
   const [visible, setVisible] = useState<boolean>(false);
   const datePickerValue = useRef<Date>();
   const overlayOpacity = useRef<Animated.Value>(new Animated.Value(0));
   const datePickerRef = useRef<DatePickerRef>({ showPicker: () => setVisible(true) });
   const theme = useTheme();
   const styles = useStyles();

   const onConfirm = () => {
      let date: Date = datePickerValue.current ?? new Date();
      date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      datePickerValue.current = date;
      setValue(date);
      setVisible(false);
      if(props.onChange)
         props.onChange(date);
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
      if (props.value && value === undefined) {
         setValue(props.value);
         datePickerValue.current = props.value;
      }
      if(props.datePickerRef) {
         (props.datePickerRef as React.MutableRefObject<DatePickerRef>).current = datePickerRef.current;
      }
   })

   return (
      <>
         <TextField
            preRenderIcon={props.preRenderIcon}
            onPreRenderIconClick={props.onPreRenderIconClick}
            postRenderIcon={props.postRenderIcon}
            onPostRenderIconClick={props.onPostRenderIconClick}
            placeholder={props.placeholder}
            autoFocus={props.autoFocus}
            contextMenuHidden={true}
            editable={false}
            onTouchStart={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            value={value ? moment(value).format("MMMM Do YYYY") : undefined}
            errorMessage={props.errorMessage}
            preventOnChange
            controlled
         />
         <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
         >
            <Animated.View style={[styles.overlay, { opacity: overlayOpacity.current }]}></Animated.View>
            <View style={styles.actionSheet}>
               <View style={styles.actionSheetBodyContainer}>
                  <View style={styles.datePickerHeaderContainer}>
                     <Label type="regular" text="Pick a date"  />
                  </View>
                  <View style={styles.datePickerContainer}>
                     <RNDatePicker
                        date={value}
                        mode="date"
                        onDateChange={d => {
                           datePickerValue.current = d;
                        }}
                        textColor={theme.value.palette.textColor}
                     />
                  </View>
                  <Link text="Confirm" onPress={() => onConfirm()} style={styles.datePickerConfirmContainer} />
               </View>
               <Link text="Cancel" onPress={() => setVisible(false)} style={styles.cancelContainer} />
            </View>
         </Modal>
      </>
   )
}

export default forwardRef<DatePickerRef, Props>((props, ref) => <DatePicker datePickerRef={ref} {...props} />);