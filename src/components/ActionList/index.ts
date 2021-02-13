import ActionList from "./List";

export interface SwipeContent {
    color: string;
    iconName: string;
}

export interface ListItem {
    id: string;
    text: string;
    note?: { text: string; color: "red" | "green"; };
    onPress: () => void;
    postIconName?: string;
    textColor?: string;
    postIconColor?: string;
    preIcon?: React.ReactNode;
    action?: React.ReactNode;
    leftSwipeContent?: SwipeContent;
    rightSwipeContent?: SwipeContent;
    leftSwipeButtons?: SwipeContent[];
    rightSwipeButtons?: SwipeContent[];
    onLeftActionRelease?: () => void;
    onRightActionRelease?: () => void;
}

export default ActionList;