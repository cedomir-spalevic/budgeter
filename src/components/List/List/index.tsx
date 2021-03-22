import React from "react";
import { makeStyles } from "context";
import { View } from "react-native";
import { ListItem } from "..";
import Item from "../Item";

const useStyles = makeStyles((theme) => ({
   container: {
      width: "100%",
      backgroundColor: theme.palette.secondaryBackground,
      borderRadius: 10,
      marginTop: 5
   }
}));

interface Props {
   items: ListItem[];
}

const List: React.FC<Props> = (props: Props) => {
   const styles = useStyles();

   return (
      <View style={styles.container}>
         {props.items.map((item, index) => (
            <Item
               key={item.id}
               item={item}
               isLast={index === props.items.length - 1}
            />
         ))}
      </View>
   );
};

export default List;
