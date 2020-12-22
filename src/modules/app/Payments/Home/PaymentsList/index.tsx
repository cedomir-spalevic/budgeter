import React, { useState } from "react";
import {
   View
} from "react-native";
import { globalStyles, colors } from "styles";
import { formatDate } from "services/internal/datetime";
import { List } from "components";
import { useNavigation } from "@react-navigation/native";
import { Payment } from "services/external/api/models/data";
import { PaymentsRoute } from "../../routes";
import Toast from "react-native-root-toast";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { usePayments } from "context/Payments";

const PaymentsList: React.FC = () => {
   const payments = usePayments();
   const navigation = useNavigation();
   const [paymentToDelete, setPaymentToDelete] = useState<Payment>();

   const deletePayment = async () => {
      await payments.deletePayment(paymentToDelete._id);
      setPaymentToDelete(undefined);
   }

   const viewPayment = (payment: Payment) => navigation.navigate(PaymentsRoute.Payment, { payment });

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
            items={payments.values.map(x => ({
               id: x._id,
               name: x.name,
               description: x.dueDate && `${formatDate(x.dueDate)}`,
               leftSwipeContent: { color: colors.red, iconName: "delete" },
               onLeftActionRelease: () => setPaymentToDelete(x),
               onPressAction: () => viewPayment(x)
            }))}
            onRefresh={async () => await payments.getPayments()}
         />
      </View>
   )
}

export default PaymentsList;