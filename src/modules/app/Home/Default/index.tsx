import React, { useEffect } from "react";
import { 
    Page, 
    Label, 
    Container, 
    ActionItem,
    Icon,
    List,
    Link,
    Spacer
} from "components";
import { useBudgets, useTheme } from "context";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const Home: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const budgets = useBudgets();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <Icon onPress={() => budgets.getPrevious()} name="chevron-left" color={theme.value.palette.primary} size={32} />,
            headerRight: () => <Icon onPress={() => budgets.getNext()} name="chevron-right" color={theme.value.palette.primary} size={32} />
        })
    })

    return (
        <Page>
            <Container title={budgets.date.format("MMMM YYYY")} allowScroll flex>
                <Label type="header" text={budgets.date.format("MMMM YYYY")} />
                <Spacer />
                <ActionItem title={<Label type="regular" text="Due Today" />} action={<Link text="View all" onPress={() => {}} />}>
                    <List 
                        items={[
                            { text: "Netflix", onPress: () => {} },
                            { text: "Spray", onPress: () => {} },
                            { text: "", onPress: () => {} }
                        ]} 
                    />
                </ActionItem>
                <Spacer />
                <ActionItem title={<Label type="regular" text="Incomes" />} action={<Link text="View all" onPress={() => {}} />}>
                    <List 
                        items={[
                            { text: "Netflix", onPress: () => {} },
                            { text: "Spray", onPress: () => {} },
                            { text: "", onPress: () => {} }
                        ]} 
                    />
                </ActionItem>
                <Spacer />
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