import React from "react";
import { 
    Page, 
    Label, 
    Container, 
    ActionItem,
    List,
    Link,
    Spacer,
    MessageBox
} from "components";
import { useBudgets } from "context/Budgets";
import { BudgetIncome } from "services/external/api/models/data/income";
import { BudgetPayment } from "services/external/api/models/data/payment";
import { DueTodayItem } from "services/external/api/models/data/budget";
import { useNavigation } from "@react-navigation/native";
import { HomeRoutes } from "../../routes";
import { toCurrency } from "services/internal/currency";
import { View } from "react-native";

interface Props {
    dueTodayItems: DueTodayItem[];
    incomeItems: BudgetIncome[];
    paymentItems: BudgetPayment[];
}

const BudgetList: React.FC<Props> = (props: Props) => {
    const budgets = useBudgets();
    const navigation = useNavigation();

    return (
        <Page>
            <Container title={`${budgets.title}`} allowScroll flex>
                <Label type="header" text={`${budgets.title}`} />
                <Spacer />
                <ActionItem title={<Label type="regular" text="Due Today" />} action={<Link text="View all" onPress={() => navigation.navigate(HomeRoutes.BudgetDueTodayList)} />}>
                    {props.dueTodayItems.length === 0 ? (
                        <MessageBox>
                            <Label
                                type="regular"
                                text="You have nothing due today!"
                            />
                        </MessageBox>
                    ) : (
                        <List 
                            items={props.dueTodayItems.map(x => ({
                                id: x.item.id,
                                text: x.item.title,
                                note: { text: toCurrency(x.item.amount), color: x.type === "income" ? "green" : "red" },
                                onPress: () => {}
                            }))} 
                        />
                    )}
                </ActionItem>
                <Spacer />
                <ActionItem title={<Label type="regular" text="Incomes" />} action={<Link text="View all" onPress={() => navigation.navigate(HomeRoutes.BudgetIncomesList)} />}>
                    {props.incomeItems.length === 0 ? (
                        <MessageBox>
                            <Label
                                type="regular"
                                text="No incomes are expected today"
                            />
                        </MessageBox>
                    ) : (
                        <List 
                            items={props.incomeItems.map(x => ({
                                id: x.id,
                                text: x.title,
                                note: { text: toCurrency(x.amount), color: "green" },
                                onPress: () => navigation.navigate(HomeRoutes.Income, { income: x })
                            }))} 
                        />
                    )}
                </ActionItem>
                <Spacer />
                <ActionItem title={<Label type="regular" text="Payments" />} action={<Link text="View all" onPress={() => navigation.navigate(HomeRoutes.BudgetPaymentsList)} />}>
                    {props.paymentItems.length === 0 ? (
                        <MessageBox>
                            <Label
                                type="regular"
                                text="You have nothing due today!"
                            />
                        </MessageBox>
                    ) : (
                        <List 
                            items={props.paymentItems.map(x => ({
                                id: x.id,
                                text: x.title,
                                note: { text: toCurrency(x.amount), color: "red" },
                                onPress: () => navigation.navigate(HomeRoutes.Payment, { payment: x })
                            }))} 
                        />
                    )}
                </ActionItem>
            </Container>
        </Page>
    )
}

export default BudgetList;