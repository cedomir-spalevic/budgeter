import React from "react";
import { 
    Page, 
    Label, 
    Container, 
    ActionItem,
    List,
    Link,
    Spacer
} from "components";
import { useBudgets } from "context/Budgets";
import { BudgetIncome } from "services/external/api/models/data/income";
import { BudgetPayment } from "services/external/api/models/data/payment";
import { DueTodayItem } from "services/external/api/models/data/budget";
import { useNavigation } from "@react-navigation/native";
import { HomeRoutes } from "../../routes";

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
                    <List 
                        items={props.dueTodayItems.map(x => ({
                            id: x.item.id,
                            text: x.item.title,
                            note: { text: `$${x.item.amount}`, color: x.type === "income" ? "green" : "red" },
                            onPress: () => {}
                        }))} 
                    />
                </ActionItem>
                {props.incomeItems.length > 0 && (
                    <>
                        <Spacer />
                        <ActionItem title={<Label type="regular" text="Incomes" />} action={<Link text="View all" onPress={() => navigation.navigate(HomeRoutes.BudgetIncomesList)} />}>
                            <List 
                                items={props.incomeItems.map(x => ({
                                    id: x.id,
                                    text: x.title,
                                    note: { text: `$${x.amount}`, color: "green" },
                                    onPress: () => {}
                                }))} 
                            />
                        </ActionItem>
                    </>
                )}
                {props.paymentItems.length > 0 && (
                    <>
                        <Spacer />
                        <ActionItem title={<Label type="regular" text="Payments" />} action={<Link text="View all" onPress={() => navigation.navigate(HomeRoutes.BudgetPaymentsList)} />}>
                            <List 
                                items={props.paymentItems.map(x => ({
                                    id: x.id,
                                    text: x.title,
                                    note: { text: `$${x.amount}`, color: "red" },
                                    onPress: () => {}
                                }))} 
                            />
                        </ActionItem>
                    </>
                )}
            </Container>
        </Page>
    )
}

export default BudgetList;