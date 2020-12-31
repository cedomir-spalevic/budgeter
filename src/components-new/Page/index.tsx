import React from "react";
import { 
    View, 
    StyleSheet, 
    Dimensions, 
    StyleProp,
    ViewStyle
} from "react-native";
import { useModal } from "context-new/Modal";


const oneTenth = Dimensions.get("screen").width * 0.1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: oneTenth,
        paddingRight: oneTenth
    },
    verticallyCenter: {
        justifyContent: "center"
    }
})

interface Props {
    children: React.ReactNode;
    modal?: boolean,
    verticallyCenter?: boolean;
}

const Page: React.FC<Props> = (props: Props) => {
    const style: StyleProp<ViewStyle> = [];
    style.push(styles.container);
    if(props.verticallyCenter)
        style.push(styles.verticallyCenter)
    if(props.modal) {
        const modal = useModal();
        style.push({ marginTop: modal.headerHeight })
    }

    return (
        <View style={style}>
            {props.children}
        </View>
    )
}

export default Page;