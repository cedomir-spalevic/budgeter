import React, { useState } from "react";
import {
    Page,
    Container,
    ActionList,
    Label,
    SummaryView,
    ConfirmDialog
} from "components";
import { useTheme } from "context";
import { useIncomes } from "context/Incomes";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { Income } from "services/external/api/models/data/income";
import { DueTodayItem } from "services/external/api/models/data/budget";
import { HomeRoutes } from "../routes";

const BudgetDueTodayList: React.FC = () => {
    const [itemToDelete, setItemToDelete] = useState<DueTodayItem>();
    const budgets = useBudgets();
    const incomes = useIncomes();
    const payments = usePayments();
    const navigation = useNavigation();
    const theme = useTheme();
    const dueTodayItems = [
        ...budgets.value.incomes.filter(x => x.dueToday).map((x): DueTodayItem => ({ type: "income", item: x })),
        ...budgets.value.payments.filter(x => x.dueToday).map((x): DueTodayItem => ({ type: "payment", item: x}))
    ]

    const deleteItem = async () => {
        // await incomes.delete(incomeToDelete.id);
        // setIncomeToDelete(undefined);
    }

    return (
        <Page>
            <Container title="Due Today" allowScroll fullWith>
                <Container>
                    <Label type="header" text="Due Today" />
                </Container>
                <Container fullWith>
                    <ActionList
                        items={dueTodayItems.map(x => ({
                            id: x.item.id,
                            text: x.item.title,
                            note: { text: `$${x.item.amount}`, color: x.type === "income" ? "green" : "red" },
                            onPress: () => {
                                if(x.type === "income")
                                    navigation.navigate(HomeRoutes.Income)
                                else
                                    navigation.navigate(HomeRoutes.Payment)
                            },
                            //leftSwipeContent: { color: theme.value.palette.error, iconName: "delete" },
                            //onLeftActionRelease: () => setIncomeToDelete(x)
                        }))}
                    />
                </Container>
            </Container>
            <Container fullWith>
                <SummaryView>
                    <View style={{ flexDirection: "row" }}>
                        <Label text="Total:" type="regular" color={theme.value.palette.primary} style={{ paddingRight: 5 }} />
                        <Label text={toCurrency(incomes.values.map(x => x.amount).reduce((p, c) => p + c, 0))} type="regular" />
                    </View>
                </SummaryView>
            </Container>
            {itemToDelete && (
                <ConfirmDialog
                    visible={true}
                    title={`Delete ${itemToDelete.item.title}?`}
                    onTouchOutside={() => setItemToDelete(undefined)}
                    message="Are you sure want to delete this income? This will be removed from all of your budgets."
                    positiveButton={{
                        title: "Yes",
                        onPress: () => deleteItem()
                    }}
                    negativeButton={{
                        title: "No",
                        onPress: () => setItemToDelete(undefined)
                    }}
                />
            )}
        </Page>
    )
}

export default BudgetDueTodayList;