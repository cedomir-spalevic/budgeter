import React, { useContext, useState } from "react";
import {
   View
} from "react-native";
import { globalStyles, colors } from "styles";
import { PaymentsContext } from "context/Payments";
import { formatDate } from "services/utils/datetime";
import { List, Icon } from "components";
import { useNavigation } from "@react-navigation/native";
import { Payment, PaymentResponse } from "services/api/models";
import { PaymentsRoute } from "../routes";
import Toast from "react-native-root-toast";
import { ConfirmDialog } from "react-native-simple-dialogs";

interface Props {
   onAddNew: (payment: Payment) => Promise<PaymentResponse>;
}

const PaymentsList: React.FC<Props> = (props: Props) => {
   const paymentsContext = useContext(PaymentsContext);
   const navigation = useNavigation();
   const [paymentToDelete, setPaymentToDelete] = useState<Payment>();

   const deletePayment = async () => {
      const deleted = await paymentsContext.deletePayment(paymentToDelete);
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
            items={paymentsContext.payments.map(x => ({
               id: x.paymentId,
               name: x.name,
               description: x.dueDate && `${formatDate(x.dueDate)}`,
               rightSwipeContent: { color: colors.red, iconName: "delete" },
               onRightActionRelease: () => setPaymentToDelete(x),
               onPressAction: () => navigateToPaymentPage(x)
            }))}
            onRefresh={async () => await paymentsContext.getPayments()}
         />
      </View>
   )
}

export default PaymentsList;