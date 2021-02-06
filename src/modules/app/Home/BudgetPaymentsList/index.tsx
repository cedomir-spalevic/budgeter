import React, { useState } from "react";
import {
    Page,
    Container,
    ActionList,
    ActionItem,
    Searchbox,
    Label,
    SummaryView,
    ConfirmDialog
} from "components";
import { useTheme } from "context";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
//import { IncomesRoutes } from "../../routes";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { Payment } from "services/external/api/models/data/payment";

const BudgetPaymentsList: React.FC = () => {
    const [paymentToDelete, setPaymentToDelete] = useState<Payment>();
    const budgets = useBudgets();
    const payments = usePayments();
    const navigation = useNavigation();
    const theme = useTheme();

    const deletePayment = async () => {
        //await incomes.delete(incomeToDelete.id);
        //setIncomeToDelete(undefined);
    }

    return (
        <Page>
            <Container title="Payments" allowScroll fullWith>
                <Container>
                    <Label type="header" text="Payments" />
                </Container>
                <Container fullWith>
                    <ActionList
                        items={budgets.value.payments.map(x => ({
                            id: x.id,
                            text: x.title,
                            note: { text: `$${x.amount}`, color: "red" },
                            onPress: () => {},
                            //onPress: () => navigation.navigate(IncomesRoutes.Income, { income: x }),
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
                        <Label text={toCurrency(budgets.value.payments.map(x => x.amount).reduce((p, c) => p + c, 0))} type="regular" />
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