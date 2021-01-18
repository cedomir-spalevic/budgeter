import React from "react";
import {
    Page,
    Container,
    ActionList,
    ActionItem,
    Searchbox,
    Label
} from "components";
import { useIncomes } from "context";
import { useNavigation } from "@react-navigation/native";
import { IncomesRoutes } from "../../routes";

const IncomesList: React.FC = () => {
    const incomes = useIncomes();
    const navigation = useNavigation();

    return (
        <Page>
            <Container allowScroll fullWith>
                <Container>
                    <ActionItem title={<Label type="header" text="Incomes" />}>
                        <Searchbox 
                            placeholder="Search Incomes"
                        />
                    </ActionItem>
                </Container>
                <Container fullWith>
                    <ActionList
                        items={incomes.values.map(x => ({
                            text: x.title,
                            note: { text: `$${x.amount}`, color: "green" },
                            onPress: () => navigation.navigate(IncomesRoutes.Income, { income: x })
                        }))}
                    />
                </Container>
            </Container>
        </Page>
    )
}

export default IncomesList;