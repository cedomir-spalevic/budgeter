import React from "react";
import { View } from "react-native";
import { makeStyles } from "context";

const useStyles = makeStyles((theme) => ({
   spacer: {
      height: theme.size.spacerHeight
   }
}));

const Spacer: React.FC = () => {
   const styles = useStyles();
   return <View style={styles.spacer}></View>;
};

export default Spacer;
