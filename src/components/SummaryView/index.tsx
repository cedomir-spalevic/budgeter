import React from "react";
import { View } from "react-native";
import { makeStyles } from "context";

const useStyles = makeStyles((theme) => ({
   container: {
      backgroundColor: theme.palette.tabBarBackground,
      paddingVertical: 20,
      paddingHorizontal: theme.size.pagePadding,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: theme.palette.systemGray6,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 1,
      elevation: 5
   }
}));

interface Props {
   children: React.ReactNode;
}

const SummaryView: React.FC<Props> = (props: Props) => {
   const styles = useStyles();
   return <View style={styles.container}>{props.children}</View>;
};

export default SummaryView;
