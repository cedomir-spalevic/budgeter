import React from "react";
import {
   View
} from "react-native";
import { makeStyles } from "context";

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: theme.palette.cardColor,
        paddingVertical: 20,
        paddingHorizontal: theme.size.pagePadding,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: theme.palette.gray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 5,  
        elevation: 5
    }
}))

interface Props {
    children: React.ReactNode;
}

const SummaryView: React.FC<Props> = (props: Props) => {
    const styles = useStyles();
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

export default SummaryView;