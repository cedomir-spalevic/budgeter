import React, { useEffect } from "react";
import { useUser } from "context/User";
import { useIncomes } from "context/Incomes";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";
import { Container, Page, Progress } from "components";
import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "../routes";

const AppLoader: React.FC = () => {
    const user = useUser();
    const incomes = useIncomes();
    const payments = usePayments();
    const budgets = useBudgets();
    const navigation = useNavigation();
 
    const load = async () => {
        try {
            /** Any app wide data load should go here */
            await Promise.all([
                await user.getUser(),
                await budgets.get(),
                await incomes.get(),
                await payments.get()
            ]);
            navigation.navigate(AppRoutes.App);
        }
        catch(error) {
        }
    }

    useEffect(() => {
        load();
    }, [])
 
    return (
        <Page>
            <Container flex verticallyCenter>
                <Progress size="large" />
            </Container>
        </Page>
    )
}

export default AppLoader;