/* eslint-disable react/no-children-prop */
import { Progress } from "components";
import { useTheme } from "context";
import React from "react";
import {
   ButtonProps,
   ConfirmDialog as RNConfirmDialog,
   ProgressDialog
} from "react-native-simple-dialogs";

interface Props {
   visible: boolean;
   loading: boolean;
   title: string;
   message: string;
   onTouchOutside: () => void;
   positiveButton: ButtonProps;
   negativeButton: ButtonProps;
}

const Dialog: React.FC<Props> = (
   props: Props
) => {
   const theme = useTheme();
   if(props.loading) {
      return (
         <ProgressDialog
            visible={props.visible}
            title={props.title}
            message={props.message}
            children={Progress}
            activityIndicatorSize="large"
            activityIndicatorStyle={{
               width: "100%"
            }}
         />
      )
   }

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
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onPress: props.negativeButton ? props.negativeButton.onPress : () => {},
            titleStyle: {
               color: theme.value.palette.red,
               fontFamily: theme.value.font.fontFamily
            }
         }}
      />
   );
};

export default Dialog;
