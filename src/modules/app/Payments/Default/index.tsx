import React, { useEffect } from "react";
import { Icon } from "components";
import { useTheme, usePayments } from "context";
import { useNavigation } from "@react-navigation/native";
import { PaymentsRoutes } from "../routes";
import NoPayments from "./NoPayments";
import PaymentsList from "./PaymentsList";

const Payments: React.FC = () => {
    const theme = useTheme();
    const payments = usePayments();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Icon onPress={() => navigation.navigate(PaymentsRoutes.Payment)} name="add-circle" color={theme.value.palette.primary} size={32} />
        })
    })

    if(payments.empty)
        return <NoPayments />
    return <PaymentsList />
}

export default Payments;