import React from "react";
import {
   KeyboardAvoidingView,
   Keyboard,
   TouchableWithoutFeedback,
   StyleProp,
   ViewStyle,
   View
} from "react-native";

interface Props {
   style?: StyleProp<ViewStyle>;
   children?: React.ReactNode;
   verticalOffset?: number;
}

const TypingView: React.FC<Props> = (props: Props) => (
   <KeyboardAvoidingView
      style={props.style}
      behavior="position"
      keyboardVerticalOffset={props.verticalOffset}
   >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <View>
            {props.children}
         </View>
      </TouchableWithoutFeedback>
   </KeyboardAvoidingView>
)

export default TypingView;