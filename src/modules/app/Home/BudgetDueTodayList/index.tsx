import React, { useState } from "react";
import {
    Page,
    Container,
    ActionList,
    Label,
    SummaryView,
    ConfirmDialog
} from "components";
import { useTheme, useUser } from "context";
import { useIncomes } from "context/Incomes";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { DueTodayItem } from "services/external/api/models/data/budget";
import { HomeRoutes } from "../routes";

const BudgetDueTodayList: React.FC = () => {
    const [itemToDelete, setItemToDelete] = useState<DueTodayItem>();
    const budgets = useBudgets();
    const incomes = useIncomes();
    const payments = usePayments();
    const navigation = useNavigation();
    const theme = useTheme();
    const user = useUser();
    const dueTodayItems = [
        ...budgets.value.incomes.filter(x => x.dueToday).map((x): DueTodayItem => ({ type: "income", item: x })),
        ...budgets.value.payments.filter(x => x.dueToday).map((x): DueTodayItem => ({ type: "payment", item: x}))
    ]

    const deleteItem = async () => {
        if(itemToDelete.type === "payment") {
            await payments.delete(itemToDelete.item.id);
            setItemToDelete(undefined);
        }
        else {
            await incomes.delete(itemToDelete.item.id);
            setItemToDelete(undefined);
        }
    }

    return (
        <Page>
            <Container title="Due Today" allowScroll fullWith>
                <Container>
                    <Label type="header" text="Due Today" />
                </Container>
                <Container fullWith>
                    <ActionList
                        items={dueTodayItems.map(x => {
                            let swipeContentKey = "leftSwipeContent", actionReleaseKey = "onLeftActionRelease";
                            if((x.type === "income" && user.swipeOptions.deleteIncome === "right") ||
                                (x.type === "payment" && user.swipeOptions.deletePayment === "right")) {
                                swipeContentKey = "rightSwipeContnet";
                                actionReleaseKey = "onRightActionRelease";
                            }
                            return ({
                                id: x.item.id,
                                text: x.item.title,
                                note: { text: toCurrency(x.item.amount), color: x.type === "income" ? "green" : "red" },
                                onPress: () => {
                                    if(x.type === "income")
                                        navigation.navigate(HomeRoutes.Income)
                                    else
                                        navigation.navigate(HomeRoutes.Payment)
                                },
                                [swipeContentKey]: { color: theme.value.palette.red, iconName: "delete" },
                                [actionReleaseKey]: () => setItemToDelete(x)
                            })
                        })}
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
                    message={`Are you sure want to delete this ${(itemToDelete.type === "payment" ? "Payment" : "Income")}? This will be removed from all of your budgets.`}
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