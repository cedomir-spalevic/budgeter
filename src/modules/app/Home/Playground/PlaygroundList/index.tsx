import { makeStyles, useTheme } from "context/Theme";
import {
   ActionItem,
   Container,
   Icon,
   Label,
   NumberPad,
   TextField
} from "components";
import React from "react";
import { View } from "react-native";
import { PlaygroundItem } from "../item";

interface Props {
   title: string;
   items: PlaygroundItem[];
   addNew: () => void;
   updateItem: (id: string, item: Partial<PlaygroundItem>) => void;
   removeItem: (id: string) => void;
}

const useStyles = makeStyles((theme) => ({
   list: {
      width: "100%",
      backgroundColor: theme.palette.secondaryBackground,
      marginTop: 5
   },
   item: {
      paddingVertical: 15,
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
   },
   itemBorder: {
      borderBottomColor: theme.palette.systemGray4,
      borderBottomWidth: 1
   }
}));

const PlaygroundList: React.FC<Props> = (props: Props) => {
   const theme = useTheme();
   const styles = useStyles();

   return (
      <>
         <Container>
            <ActionItem
               title={<Label type="regular" text={props.title} />}
               action={
                  <Icon
                     name="add"
                     color={theme.value.palette.primary}
                     size={32}
                     onPress={props.addNew}
                  />
               }
            ></ActionItem>
         </Container>
         <Container fullWith>
            <View style={styles.list}>
               {props.items.map((item, index) => {
                  const containerStyles = [styles.item];
                  if (index !== props.items.length - 1)
                     containerStyles.push(styles.itemBorder);
                  return (
                     <View key={item.id} style={[containerStyles]}>
                        <View style={{ width: "60%" }}>
                           <TextField
                              inputStyles={{ borderBottomWidth: 0 }}
                              value={item.title}
                              onChange={(title) =>
                                 props.updateItem(item.id, { title })
                              }
                           />
                        </View>
                        <View style={{ width: "25%" }}>
                           <NumberPad
                              inputStyles={{ borderBottomWidth: 0 }}
                              value={item.amount}
                              onChange={(amount) =>
                                 props.updateItem(item.id, { amount })
                              }
                           />
                        </View>
                        <View style={{ width: "10%" }}>
                           <Icon
                              name="close"
                              size={24}
                              color={theme.value.palette.red}
                              onPress={() => props.removeItem(item.id)}
                           />
                        </View>
                     </View>
                  );
               })}
            </View>
         </Container>
      </>
   );
};

export default PlaygroundList;
