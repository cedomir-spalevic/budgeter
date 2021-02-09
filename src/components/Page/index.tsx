import React from "react";
import { 
    View, 
    StyleProp,
    ViewStyle
} from "react-native";
import { makeStyles } from "context";

const useStyles = makeStyles(theme => ({
    container: {
        flex: 1,
        backgroundColor: theme.palette.appBackground
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

    return (
        <View style={style}>
            {props.children}
        </View>
    )
}

export default Page;