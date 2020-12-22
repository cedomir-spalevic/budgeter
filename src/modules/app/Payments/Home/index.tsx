import React, { useEffect } from "react";
import PaymentsList from "./PaymentsList";
import { Empty, Icon } from "components";
import { useNavigation } from "@react-navigation/native";
import { PaymentsRoute } from "../routes";
import { usePayments } from "context/Payments";
import { colors } from "styles";

const PaymentsHomeScreen: React.FC = () => {
   const navigation = useNavigation();
   const payments = usePayments();

   const createNewPayment = () => navigation.navigate(PaymentsRoute.Payment)

   useEffect(() => {
      if(payments.values.length > 0)
         navigation.setOptions({
            headerRight: () => (
               <Icon
                  name="add"
                  style={{ paddingRight: 20, color: colors.primary, fontSize: 32 }}
                  onPress={() => createNewPayment()}
               />
            )
         })
   })

   if (payments.values.length === 0) 
      return (
         <Empty
            message="You don't have any Payments yet!"
            addCreateNew={true}
            onCreateNewClick={() => createNewPayment()}
         />
      )

   return <PaymentsList />
}

export default PaymentsHomeScreen;