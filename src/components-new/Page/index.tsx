import React from "react";
import { 
    View, 
    StyleProp,
    ViewStyle
} from "react-native";
import { makeStyles, useModal } from "context-new";

const useStyles = makeStyles(palette => ({
    container: {
        flex: 1,
        backgroundColor: palette.secondary
    }
}))

interface Props {
    children: React.ReactNode;
    modal?: boolean,
}

const Page: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
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