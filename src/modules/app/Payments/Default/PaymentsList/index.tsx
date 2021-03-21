import React, { useState } from "react";
import {
   Page,
   Container,
   ActionList,
   ActionItem,
   Searchbox,
   Label,
   ConfirmDialog,
   Progress
} from "components";
import { makeStyles, usePayments, useTheme, useUser } from "context";
import { useNavigation } from "@react-navigation/native";
import { toCurrency } from "services/internal/currency";
import { Payment } from "services/external/api/models/data/payment";
import { View } from "react-native";
import PaymentsRoutes from "../../routes";

const useStyles = makeStyles(() => ({
   loading: {
      paddingTop: 15
   }
}));

const PaymentsList: React.FC = () => {
   const [searchValue, setSearchValue] = useState<string>();
   const [loading, setLoading] = useState<boolean>(false);
   const [paymentToDelete, setPaymentToDelete] = useState<Payment>();
   const payments = usePayments();
   const navigation = useNavigation();
   const theme = useTheme();
   const user = useUser();
   const styles = useStyles();

   const search = (sv: string) => {
      setSearchValue(sv);
      payments.get(sv);
   };

   const getNext = async () => {
      if (loading) return;
      setLoading(true);
      await payments.get(searchValue, true);
      setLoading(false);
   };

   const deletePayment = async () => {
      await payments.delete(paymentToDelete.id);
      setPaymentToDelete(undefined);
   };

   return (
      <Page>
         <Container
            allowScroll
            fullWith
            title="Payments"
            onCloseToBottom={getNext}
         >
            <Container>
               <ActionItem title={<Label type="header" text="Payments" />}>
                  <Searchbox placeholder="Search Payments" onChange={search} />
               </ActionItem>
            </Container>
            <Container fullWith>
               <ActionList
                  items={payments.values.map((x) => {
                     let swipeContentKey = "leftSwipeContent";
                     let actionReleaseKey = "onLeftActionRelease";
                     if (user.swipeOptions.deleteIncome === "right") {
                        swipeContentKey = "rightSwipeContent";
                        actionReleaseKey = "onRightActionRelease";
                     }
                     return {
                        id: x.id,
                        text: x.title,
                        note: { text: toCurrency(x.amount), color: "red" },
                        onPress: () =>
                           navigation.navigate(PaymentsRoutes.Payment, {
                              payment: x
                           }),
                        [swipeContentKey]: {
                           color: theme.value.palette.red,
                           iconName: "delete"
                        },
                        [actionReleaseKey]: () => setPaymentToDelete(x)
                     };
                  })}
               />
            </Container>
            {loading && (
               <View style={styles.loading}>
                  <Progress size="small" />
               </View>
            )}
         </Container>
         <ConfirmDialog
            visible={paymentToDelete !== undefined}
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
      </Page>
   );
};

export default PaymentsList;
