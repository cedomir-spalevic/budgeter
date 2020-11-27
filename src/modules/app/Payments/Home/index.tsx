import React, { useContext, useEffect } from "react";
import PaymentsList from "../PaymentsList";
import { Empty } from "components";
import { useNavigation } from "@react-navigation/native";
import { Payment, PaymentResponse } from "services/external/api/models";
import { PaymentsRoute } from "../routes";
import { usePayments } from "context/Payments/context";

const PaymentsHomeScreen: React.FC = () => {
   const navigation = useNavigation();
   const payments = usePayments();

   const onSave = async (payment: Payment): Promise<PaymentResponse> => {
      const response = await payments.paymentOnSave(payment);
      if (response && response.valid)
         navigation.goBack();
      return response;
   }

   useEffect(() => {
      payments.getPayments();
   }, []);

   if (payments.payments.length === 0) {
      navigation.setOptions({
         headerRight: () => null
      })
      return (
         <Empty
            message="You don't have any Payments yet!"
            addCreateNew={true}
            onCreateNewClick={() => navigation.navigate(PaymentsRoute.Payment, { onSave })}
         />
      )
   }
   return <PaymentsList onAddNew={onSave} />
}

export default PaymentsHomeScreen;