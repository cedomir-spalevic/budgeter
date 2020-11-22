import React, { useContext, useEffect } from "react";
import { PaymentsContext } from "context/Payments";
import PaymentsList from "../PaymentsList";
import { Empty } from "components";
import { useNavigation } from "@react-navigation/native";
import { Payment, PaymentResponse } from "services/api/models";
import { PaymentsRoute } from "../routes";

const PaymentsHomeScreen: React.FC = () => {
   const navigation = useNavigation();
   const paymentsContext = useContext(PaymentsContext);

   const onSave = async (payment: Payment): Promise<PaymentResponse> => {
      const response = await paymentsContext.paymentOnSave(payment);
      if (response && response.valid)
         navigation.goBack();
      return response;
   }

   useEffect(() => {
      paymentsContext.getPayments();
   }, []);

   if (paymentsContext.payments.length === 0) {
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