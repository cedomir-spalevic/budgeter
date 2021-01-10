import React, { useEffect } from "react";
import { 
    Container,
    List,
    Icon,
    Empty,
    Page, 
    Label 
} from "components";
import { View } from "react-native";
import { useAuth, useTheme, usePayments, useIncomes } from "context";
import { useNavigation } from "@react-navigation/native";
import { IncomesRoutes } from "../routes";

const Incomes: React.FC = () => {
    const theme = useTheme();
    const incomes = useIncomes();
    const navigation = useNavigation();

    const renderPayments = () => {
        if(incomes.values.length === 0) 
            return <Empty message="You have no incomes, yet" addCreateNew={false} onCreateNewClick={() => {}} />
    }

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Icon onPress={() => navigation.navigate(IncomesRoutes.Income)} name="add" color={theme.value.palette.primary} size={32} />
        })
    })

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