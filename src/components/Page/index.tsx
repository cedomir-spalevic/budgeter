import React from "react";
import { 
    View, 
    StyleProp,
    ViewStyle,
    StatusBar
} from "react-native";
import { makeStyles, useTheme } from "context";

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
    const theme = useTheme();
    const styles = useStyles();
    const style: StyleProp<ViewStyle> = [];
    style.push(styles.container);

    return (
        <View style={style}>
            <StatusBar barStyle={theme.isDarkTheme ? "light-content" : "dark-content"} />
            {props.children}
        </View>
    )
}

export default Page;