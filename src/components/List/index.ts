import List from "./List";

export interface ListItem {
   id: string;
   text: string;
   note?: { text: string; color: "red" | "green" };
   onPress?: () => void;
   iconName?: string;
   textColor?: string;
   iconColor?: string;
   action?: React.ReactNode;
}

export default List;
