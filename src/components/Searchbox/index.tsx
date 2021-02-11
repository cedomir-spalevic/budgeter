import { Icon, Link } from "components";
import { makeStyles, useTheme } from "context";
import React, { useEffect, useRef, useState } from "react";
import {
   View,
   TextInput,
   Animated,
   Keyboard
} from "react-native";

const useStyles = makeStyles(theme => ({
   container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.size.spacerHeight
   },
   textContainer: {
      padding: 10,
      backgroundColor: theme.palette.searchBoxContainer,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      flex: 1
   },
   textInput: {
      fontSize: theme.font.regularSize,
      fontFamily: theme.font.fontFamily,
      color: theme.palette.textColor
   },
   linkStyles: {
      alignItems: "flex-end"
   }
}))

interface Props {
   onChange?: (newText?: string) => void;
   placeholder?: string;
}

const Searchbox: React.FC<Props> = (props: Props) => {
   const ref = useRef<TextInput>();
   const [value, setValue] = useState<string>();
   const [showCancel, setShowCancel] = useState<boolean>(false);
   const [showCancelText, setShowCancelText] = useState<boolean>(false);
   const containerWidth = useRef<number>(0);
   const cancelWidthAnimation = useRef<Animated.Value>(new Animated.Value(0));
   const styles = useStyles();
   const linkStyles = [styles.linkStyles];
   linkStyles.push({ display: showCancel && showCancelText ? "flex" : "none" })
   const theme = useTheme();

   const onChange = (input?: string) => {
      let newValue = (input === undefined ? "" : input);
      setValue(newValue);
      if(props.onChange)
         props.onChange(newValue);
   }

   const cancel = () => {
      onChange(undefined);
      setShowCancel(false);
      Keyboard.dismiss();
   }

   useEffect(() => {
      Animated.timing(
         cancelWidthAnimation.current,
         {
            toValue: showCancel ? (containerWidth.current / 5) : 0,
            duration: 275,
            useNativeDriver: false
         }
      ).start(e => {
         if(e.finished)
            setShowCancelText(showCancel);
      });
   }, [showCancel]);

   return (
      <View style={styles.container} onLayout={e => containerWidth.current = e.nativeEvent.layout.width}>
         <View style={styles.textContainer} onTouchStart={() => ref.current && ref.current.focus()}>
            <Icon size={18} color={theme.value.palette.systemGray} name="search" />
            <TextInput
               value={value}
               placeholder={props.placeholder}
               placeholderTextColor={theme.value.palette.systemGray}
               onChangeText={onChange}
               style={styles.textInput}
               onFocus={() => setShowCancel(true)}
               onTouchStart={() => setShowCancel(true)}
               onBlur={() => setShowCancel(false)}
               ref={ref}
               keyboardAppearance={theme.isDarkTheme ? "dark" : "light"}
            />
         </View>
         <Animated.View style={{ width: cancelWidthAnimation.current }}>
            <Link
               style={linkStyles}
               text="Cancel"
               onPress={() => cancel()}
            />
         </Animated.View>
      </View>
   )
}

export default Searchbox;