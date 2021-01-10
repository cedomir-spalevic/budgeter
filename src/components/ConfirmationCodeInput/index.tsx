import { makeStyles, useTheme } from "context";
import React, { useEffect, useState } from "react";
import {
   View,
   Text
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Label } from "components";

const useStyles = makeStyles(theme => ({
    cell: {
        width: 45,
        height: 45,
        borderBottomWidth: 2,
        borderBottomColor: "#e0e0e0",
        textAlign: 'center',
    },
    focusCell: {
        borderBottomColor: theme.palette.primary,
    },
}))

interface Props {
    onChange: (code: number) => void;
    onSubmit: (code: number) => void;
}

const CELL_COUNT = 6;

const ConfirmationCodeInput: React.FC<Props> = (props: Props) => {
    const [value, setValue] = useState<string>("");
    const [p, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
      });
    const styles = useStyles();

    const onChange = (text: string) => {
        setValue(text);
        props.onChange(Number(text));
    }

    useEffect(() => {   
        if(value.length === CELL_COUNT)
            props.onSubmit(Number(value));
    }, [value])

    return (
        <View>
            <CodeField
                autoFocus
                value={value}
                onChangeText={onChange}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                    <View key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
                        <Label 
                            type="code"
                            style={{ textAlign: "center" }}
                            text={symbol || (isFocused ? <Cursor /> : null)}
                        />
                    </View>
                )}
            />
        </View>
    )
}

export default ConfirmationCodeInput;