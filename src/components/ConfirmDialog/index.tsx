import { useTheme } from "context";
import React from "react";
import { ConfirmDialog as RNConfirmDialog, ConfirmDialogProps } from "react-native-simple-dialogs";

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props: ConfirmDialogProps) => {
    const theme = useTheme();

    return (
        <RNConfirmDialog
            {...props}
            dialogStyle={{
                backgroundColor: theme.value.palette.cardColor
            }}
            titleStyle={{
                fontFamily: theme.value.font.fontFamily,
                color: theme.value.palette.textColor
            }}
            messageStyle={{
                fontFamily: theme.value.font.fontFamily,
                color: theme.value.palette.gray
            }}
            positiveButton={{
                ...props.positiveButton,
                titleStyle: {
                    color: theme.value.palette.primary,
                    fontFamily: theme.value.font.fontFamily
                }
            }}
            negativeButton={{
                ...props.negativeButton,
                titleStyle: {
                    color: theme.value.palette.error,
                    fontFamily: theme.value.font.fontFamily
                }
            }}
        />
    )
}

export default ConfirmDialog