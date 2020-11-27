import React, { useContext, useState } from "react";
import {
   View
} from "react-native";
import { globalStyles, colors } from "styles";
import { formatDate } from "services/internal/datetime";
import { List, Icon } from "components";
import { useNavigation } from "@react-navigation/native";
import { Payment, PaymentResponse } from "services/external/api/models";
import { PaymentsRoute } from "../routes";
import Toast from "react-native-root-toast";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { usePayments } from "context/Payments/context";

interface Props {
   onAddNew: (payment: Payment) => Promise<PaymentResponse>;
}

const PaymentsList: React.FC<Props> = (props: Props) => {
   const payments = usePayments();
   const navigation = useNavigation();
   const [paymentToDelete, setPaymentToDelete] = useState<Payment>();

   const deletePayment = async () => {
      const deleted = await payments.deletePayment(paymentToDelete);
      if (!deleted)
         Toast.show("Unable to delete payment");
      setPaymentToDelete(undefined);
   }

   const navigateToPaymentPage = (payment: Payment) => {
      const params = {
         onSave: props.onAddNew,
         payment
      }
      navigation.navigate(PaymentsRoute.Payment, params);
   }

   navigation.setOptions({
      headerRight: () => (
         <Icon
            name="add"
            color={colors.primary}
            size={32}
            style={{ paddingRight: 20 }}
            onPress={() => navigation.navigate(PaymentsRoute.Payment, { onSave: props.onAddNew })}
         />
      )
   })

   return (
      <View style={globalStyles.listContainer}>
         {paymentToDelete &&
            <ConfirmDialog
               visible={true}
               title={`Delete ${paymentToDelete.name}`}
               onTouchOutside={() => setPaymentToDelete(undefined)}
               message="Are you sure you want to continue? This payment will be removed from all of your active Budgets."
               positiveButton={{
                  title: "Yes",
                  onPress: () => deletePayment()
               }}
               negativeButton={{
                  title: "No",
                  onPress: () => setPaymentToDelete(undefined)
               }}
            />}
         <List
            items={payments.payments.map(x => ({
               id: x.paymentId,
               name: x.name,
               description: x.dueDate && `${formatDate(x.dueDate)}`,
               leftSwipeContent: { color: colors.red, iconName: "delete" },
               onLeftActionRelease: () => setPaymentToDelete(x),
               onPressAction: () => navigateToPaymentPage(x)
            }))}
            onRefresh={async () => await payments.getPayments()}
         />
      </View>
   )
}

export default PaymentsList;