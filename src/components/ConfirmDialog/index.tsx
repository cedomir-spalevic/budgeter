/* eslint-disable @typescript-eslint/no-empty-function */
import { useTheme } from "context";
import React from "react";
import {
   ConfirmDialog as RNConfirmDialog,
   ConfirmDialogProps
} from "react-native-simple-dialogs";

const ConfirmDialog: React.FC<ConfirmDialogProps> = (
   props: ConfirmDialogProps
) => {
   const theme = useTheme();

   return (
      <RNConfirmDialog
         {...props}
         dialogStyle={{
            backgroundColor: theme.value.palette.secondaryBackground
         }}
         titleStyle={{
            fontFamily: theme.value.font.fontFamily,
            color: theme.value.palette.textColor
         }}
         messageStyle={{
            fontFamily: theme.value.font.fontFamily,
            color: theme.value.palette.systemGray
         }}
         positiveButton={{
            ...props.positiveButton,
            titleStyle: {
               color: theme.value.palette.primary,
               fontFamily: theme.value.font.fontFamily
            }
         }}
         negativeButton={{
            title: props.negativeButton ? props.negativeButton.title : "",
            onPress: props.negativeButton
               ? props.negativeButton.onPress
               : () => {},
            titleStyle: {
               color: theme.value.palette.red,
               fontFamily: theme.value.font.fontFamily
            }
         }}
      />
   );
};

export default ConfirmDialog;
