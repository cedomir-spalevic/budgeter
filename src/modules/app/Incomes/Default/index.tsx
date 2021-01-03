import React from "react";
import { 
    Container,
    List,
    Empty,
    Page, 
    Label 
} from "components";
import { View } from "react-native";
import { useAuth, useTheme, usePayments, useIncomes } from "context";

const Incomes: React.FC = () => {
    const theme = useTheme();
    const incomes = useIncomes();

    const renderPayments = () => {
        if(incomes.values.length === 0) 
            return <Empty message="You have no incomes, yet" addCreateNew={false} onCreateNewClick={() => {}} />
    }

    return (
        <Page useHeaderHeight>
            <Container flex>
                <Label type="header" text="Incomes" />
                <Container flex verticallyCenter>
                    {renderPayments()}
                </Container>
            </Container>
        </Page>
    )
}

export default Incomes;