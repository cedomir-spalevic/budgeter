import React from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity
} from "react-native";
import { globalStyles, colors } from "styles";
import { NoData } from "assets/svg";
import { Icon, Label, Link } from "components";

const styles = StyleSheet.create({
   textView: {
      paddingBottom: 20
   },
   linkView: {
      paddingTop: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
   },
   text: {
      fontSize: 20,
      fontFamily: "Helvetica Neue",
      color: colors.black
   },
   link: {
      fontSize: 18,
      color: colors.blue
   },
   linkIcon: {
      fontSize: 21,
      color: colors.blue,
      marginLeft: 5
   }
})

interface Props {
   message: string;
   addCreateNew: boolean;
   onCreateNewClick?: () => void;
}

const Empty: React.FC<Props> = (props: Props) => {
   return (
      <View style={globalStyles.centeredScreen}>
         <View style={styles.textView}>
            <Label text={props.message} type="regular" />
            {props.addCreateNew &&
               <TouchableOpacity style={styles.linkView} onPress={() => props.onCreateNewClick && props.onCreateNewClick()}>
                  <Text style={styles.link}>
                     Let's create one
                  </Text>
                  <Icon name="arrow-forward" style={styles.linkIcon} />
               </TouchableOpacity>}
         </View>
         <NoData />
      </View>
   )
}

export default Empty;