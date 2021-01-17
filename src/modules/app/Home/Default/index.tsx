import React, { useEffect } from "react";
import { 
    Page, 
    Label, 
    Container, 
    ActionItem,
    Icon,
    List,
    Link,
    Button
} from "components";
import { makeStyles, useTheme } from "context";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "context/User";

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
    const user = useUser();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View style={styles.header}>
                    <Icon name="chevron-left" size={24} color={theme.value.palette.primary} />
                    <Label type="regular" text="December 2020" />
                    <Icon name="chevron-right" size={24} color={theme.value.palette.primary} />
                </View>
            )
        })
    })

    return (
        <Page useHeaderHeight>
            <Container flex>
                <Text>{user.value.firstName}</Text>
                <Button text="Get User" onPress={() => user.getUser()} />
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