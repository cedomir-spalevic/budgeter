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
import { usePayments, useTheme } from "context";
import { useNavigation } from "@react-navigation/native";
import { PaymentsRoutes } from "../../routes";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { Payment } from "services/external/api/models/data/payment";

const PaymentsList: React.FC = () => {
    const [paymentToDelete, setPaymentToDelete] = useState<Payment>();
    const payments = usePayments();
    const navigation = useNavigation();
    const theme = useTheme();

    const deletePayment = async () => {
        await payments.delete(paymentToDelete.id);
        setPaymentToDelete(undefined);
    }

    return (
        <Page>
            <Container allowScroll fullWith>
                <Container>
                    <ActionItem title={<Label type="header" text="Payments" />}>
                        <Searchbox 
                            placeholder="Search Payments"
                            onChange={searchValue => payments.get(searchValue)}
                        />
                    </ActionItem>
                </Container>
                <Container fullWith>
                    <ActionList
                        items={payments.values.map(x => ({
                            id: x.id,
                            text: x.title,
                            note: { text: `$${x.amount}`, color: "green" },
                            onPress: () => navigation.navigate(PaymentsRoutes.Payment, { income: x }),
                            leftSwipeContent: { color: theme.value.palette.error, iconName: "delete" },
                            onLeftActionRelease: () => setPaymentToDelete(x)
                        }))}
                    />
                </Container>
            </Container>
            <Container fullWith>
                <SummaryView>
                    <View style={{ flexDirection: "row" }}>
                        <Label text="Total:" type="regular" color={theme.value.palette.primary} style={{ paddingRight: 5 }} />
                        <Label text={toCurrency(payments.values.map(x => x.amount).reduce((p, c) => p + c, 0))} type="regular" />
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

export default PaymentsList;