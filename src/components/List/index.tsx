import React, { useState } from "react";
import {
   FlatList,
   RefreshControl
} from "react-native";
import ListItem, { Item } from "../ListItem";

interface Props {
   items: Item[];
   onRefresh: () => void;
}

interface SwipeActivation {
   [name: string]: boolean;
}

const List: React.FC<Props> = (props: Props) => {
   const [itemSwipeActivations, setItemSwipeActivations] = useState<SwipeActivation>({});
   const [isSwiping, setIsSwiping] = useState<boolean>(false);
   const [refreshing, setRefreshing] = useState<boolean>(false);

   const toggleItemSwipeActivations = (id) => {
      itemSwipeActivations[id] = !itemSwipeActivations[id];
      setItemSwipeActivations({ ...itemSwipeActivations });
   }

   const getItems = async () => {
      setRefreshing(true);
      await props.onRefresh();
   }

   return (
      <FlatList
         data={props.items}
         scrollEnabled={!isSwiping}
         refreshControl={(
            <RefreshControl
               refreshing={refreshing}
               onRefresh={() => getItems()}
            />
         )}
         renderItem={({ item }) => {
            if (item.leftSwipeContent)
               item.leftSwipeContent.activated = itemSwipeActivations[item.id];
            if (item.rightSwipeContent)
               item.rightSwipeContent.activated = itemSwipeActivations[item.id];
            return (
               <ListItem
                  onSwipeStart={() => setIsSwiping(true)}
                  onSwipeRelease={() => setIsSwiping(false)}
                  onLeftActionActivated={() => toggleItemSwipeActivations(item.id)}
                  onLeftActionDeactivated={() => toggleItemSwipeActivations(item.id)}
                  onRightActionActivated={() => toggleItemSwipeActivations(item.id)}
                  onRightActionDeactivated={() => toggleItemSwipeActivations(item.id)}
                  item={item}
               />
         )}}
      />
   )
}

export default List;