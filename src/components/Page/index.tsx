import React from "react";
import { 
    View, 
    StyleProp,
    ViewStyle
} from "react-native";
import { makeStyles, useNavigationHeader } from "context";

const useStyles = makeStyles(palette => ({
    container: {
        flex: 1,
        backgroundColor: palette.secondary
    }
}))

interface Props {
    children: React.ReactNode;
    useHeaderHeight?: boolean,
}

const Page: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    const style: StyleProp<ViewStyle> = [];
    style.push(styles.container);
    if(props.useHeaderHeight) {
        const navigationHeader = useNavigationHeader();
        style.push({ paddingTop: navigationHeader.headerHeight })
    }

    return (
        <View style={style}>
            {props.children}
        </View>
    )
}

export default Page;