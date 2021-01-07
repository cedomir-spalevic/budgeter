import { Icon } from "components";
import { makeStyles, useTheme } from "context";
import React, { useState, useEffect } from "react";
import {
   View,
   TextInput,
   TouchableOpacity
} from "react-native";

const useStyles = makeStyles(palette => ({
   container: {
      padding: 10,
      backgroundColor: "#e0e0e0",
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      width: "100%"
   },
   icon: {
      fontSize: 18,
      width: 25,
      color: palette.gray,
      resizeMode: "contain"
   }
}))

interface Props {
   value?: string;
   onChange?: (newText: string) => void;
   placeholder?: string;
}

const Searchbox: React.FC<Props> = (props: Props) => {
   const [value, setValue] = useState<string>();
   const styles = useStyles();
   const theme = useTheme();

   const onChange = (input?: string) => {
      let newValue = (input === undefined ? "" : input);
      setValue(newValue);
      if(props.onChange)
         props.onChange(newValue);
   }

   useEffect(() => {
      if (props.value && value === undefined)
         setValue(props.value);
   })

   return (
      <View style={styles.container}>
          <Icon size={18} color={theme.pallette.gray} name="search" />
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={theme.pallette.gray}
            onChangeText={onChange}
            style={{ width: "80%" }}
          />
      </View>
   )
}

export default Searchbox;