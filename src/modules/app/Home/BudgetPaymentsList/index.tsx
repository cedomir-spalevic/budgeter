import React, { useEffect, useState } from "react";
import {
    Page,
    Container,
    ActionList,
    Label,
    SummaryView,
    ConfirmDialog,
    Searchbox,
    ActionItem
} from "components";
import { useTheme, useUser } from "context";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { BudgetPayment, Payment } from "services/external/api/models/data/payment";
import { HomeRoutes } from "../routes";

const BudgetPaymentsList: React.FC = () => {
    const [list, setList] = useState<BudgetPayment[]>([]);
    const [paymentToDelete, setPaymentToDelete] = useState<BudgetPayment>();
    const budgets = useBudgets();
    const payments = usePayments();
    const navigation = useNavigation();
    const theme = useTheme();
    const user = useUser();

    const onSearch = (searchValue: string) => {
        const l = budgets.value.payments.filter(x => x.title.trim().toLowerCase().includes(searchValue.trim().toLowerCase()));
        setList([...l])
    }

    const deletePayment = async () => {
        await payments.delete(paymentToDelete.id);
        setPaymentToDelete(undefined);
    }

    useEffect(() => {
        setList([...budgets.value.payments])
    }, [])

    return (
        <Page>
            <Container title="Payments" allowScroll fullWith>
                <Container>
                    <ActionItem title={<Label type="header" text="Payments" />}>
                        <Searchbox 
                            placeholder="Search Payments"
                            onChange={onSearch}
                        />
                    </ActionItem>
                </Container>
                <Container fullWith>
                    <ActionList
                        items={list.map(x => {
                            let swipeContentKey = "leftSwipeContent", actionReleaseKey = "onLeftActionRelease";
                            if(user.swipeOptions.deletePayment === "right") {
                                swipeContentKey = "rightSwipeContent";
                                actionReleaseKey = "onRightActionRelease";
                            }
                            return ({
                                id: x.id,
                                text: x.title,
                                note: { text: `${toCurrency(x.amount)} (x${x.numberOfOccurrences})`, color: "red" },
                                onPress: () => navigation.navigate(HomeRoutes.Payment, { payment: x }),
                                [swipeContentKey]: { color: theme.value.palette.red, iconName: "delete" },
                                [actionReleaseKey]: () => setPaymentToDelete(x)
                            })
                        })}
                    />
                </Container>
            </Container>
            <Container fullWith>
                <SummaryView>
                    <View style={{ flexDirection: "row" }}>
                        <Label text="Total:" type="regular" color={theme.value.palette.primary} style={{ paddingRight: 5 }} />
                        <Label text={toCurrency(list.map(x => x.totalAmount).reduce((p, c) => p + c, 0))} type="regular" />
                    </View>
                </SummaryView>
            </Container>
            {paymentToDelete && (
                <ConfirmDialog
                    visible={true}
                    title={`Delete ${paymentToDelete.title}?`}
                    onTouchOutside={() => setPaymentToDelete(undefined)}
                    message="Are you sure want to delete this payment? This will be removed from all of your budgets."
                    positiveButton={{
                        title: "Yes",
                        onPress: () => deletePayment()
                    }}
                    negativeButton={{
                        title: "No",
                        onPress: () => setPaymentToDelete(undefined)
                    }}
                />
            )}
        </Page>
    )
}

export default BudgetPaymentsList;