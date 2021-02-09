import React from "react";
import {
   View,
   Text,
   TouchableOpacity
} from "react-native";
import { NoData } from "assets/svg";
import { Icon, Label, Container } from "components";
import { makeStyles } from "context";

const useStyles = makeStyles(theme => ({
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
      color: theme.palette.black
   },
   link: {
      fontSize: 18,
      color: theme.palette.primary
   },
   linkIcon: {
      fontSize: 21,
      color: theme.palette.primary,
      marginLeft: 5
   }
}))

interface Props {
   message: string;
   addCreateNew: boolean;
   onCreateNewClick?: () => void;
}

const Empty: React.FC<Props> = (props: Props) => {
   const styles = useStyles();
   return (
      <Container flex verticallyCenter>
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
      </Container>
   )
}

export default Empty;