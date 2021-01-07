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

const useStyles = makeStyles(() => ({
    header: {
        flexDirection: "row",
        alignItems: "center"
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
                    <Icon name="chevron-left" size={24} color={theme.pallette.primary} />
                    <Label type="regular" text="December 2020" />
                    <Icon name="chevron-right" size={24} color={theme.pallette.primary} />
                </View>
            )
        })
    })

    return (
        <Page useHeaderHeight>
            <Container flex>
                <ActionItem title={<Label type="header" text="Today" />} action={<Link text="View all" onPress={() => {}} />}>
                    <List 
                        items={[
                            { text: "Netflix", onPress: () => {} },
                            { text: "Spray", onPress: () => {} },
                            { text: "", onPress: () => {} }
                        ]} 
                    />
                </ActionItem>
                <View style={styles.spacer} />
                <ActionItem title={<Label type="header" text="Incomes" />} action={<Link text="View all" onPress={() => {}} />}>
                    <List 
                        items={[
                            { text: "Netflix", onPress: () => {} },
                            { text: "Spray", onPress: () => {} },
                            { text: "", onPress: () => {} }
                        ]} 
                    />
                </ActionItem>
                <View style={styles.spacer} />
                <ActionItem title={<Label type="header" text="Payments" />} action={<Link text="View all" onPress={() => {}} />}>
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