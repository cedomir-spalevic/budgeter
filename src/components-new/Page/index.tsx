import React from "react";
import { 
    View, 
    StyleSheet, 
    StyleProp,
    ViewStyle
} from "react-native";
import { useModal } from "context-new";

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

interface Props {
    children: React.ReactNode;
    modal?: boolean,
}

const Page: React.FC<Props> = (props: Props) => {
    const style: StyleProp<ViewStyle> = [];
    style.push(styles.container);
    if(props.modal) {
        const modal = useModal();
        style.push({ paddingTop: modal.headerHeight })
    }

    return (
        <View style={style}>
            {props.children}
        </View>
    )
}

export default Page;