import React, { useEffect } from "react";
import { 
    Page, 
    Label, 
    Container, 
    ActionItem,
    Icon,
    List,
    Link
} from "components";
import { makeStyles, useTheme } from "context";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const useStyles = makeStyles(() => ({
    header: {
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        justifyContent: "center"
    },
    spacer: {
        height: 20
    }
}))

const Home: React.FC = () => {
    const styles = useStyles();
    const navigation = useNavigation();
    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.header}>
                    <Icon name="chevron-left" size={32} color={theme.value.palette.primary} />
                    <Label type="header" text={moment().format("MMMM YYYY")} />
                    <Icon name="chevron-right" size={32} color={theme.value.palette.primary} />
                </View>
            )
        })
    })

    return (
        <Page>
            <Container allowScroll flex>
                <ActionItem title={<Label type="regular" text="Today" />} action={<Link text="View all" onPress={() => {}} />}>
                    <List 
                        items={[
                            { text: "Netflix", onPress: () => {} },
                            { text: "Spray", onPress: () => {} },
                            { text: "", onPress: () => {} }
                        ]} 
                    />
                </ActionItem>
                <View style={styles.spacer} />
                <ActionItem title={<Label type="regular" text="Incomes" />} action={<Link text="View all" onPress={() => {}} />}>
                    <List 
                        items={[
                            { text: "Netflix", onPress: () => {} },
                            { text: "Spray", onPress: () => {} },
                            { text: "", onPress: () => {} }
                        ]} 
                    />
                </ActionItem>
                <View style={styles.spacer} />
                <ActionItem title={<Label type="regular" text="Payments" />} action={<Link text="View all" onPress={() => {}} />}>
                    <List 
                        items={[
                            { text: "Netflix", onPress: () => {} },
                            { text: "Spray", onPress: () => {} },
                            { text: "", onPress: () => {} }
                        ]} 
                    />
                </ActionItem>
            </Container>
        </Page>
    )
}

export default Home;