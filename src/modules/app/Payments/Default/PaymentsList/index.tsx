import React, { useRef, useState } from "react";
import {
   Page,
   Container,
   ActionList,
   ActionItem,
   Searchbox,
   Label,
   Progress
} from "components";
import { makeStyles, useTheme } from "context";
import { useUser } from "context/User";
import { usePayments } from "context/Payments";
import { useNavigation } from "@react-navigation/native";
import { toCurrency } from "services/internal/currency";
import { Payment } from "services/models/data/payment";
import { View } from "react-native";
import PaymentsRoutes from "../../routes";
import DeleteDialog from "../../../Shared/DeleteDialog";

const useStyles = makeStyles(() => ({
   loading: {
      paddingTop: 15
   }
}));

const PaymentsList: React.FC = () => {
   const [searchValue, setSearchValue] = useState<string>();
   const gettingNext = useRef<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);
   const [paymentToDelete, setPaymentToDelete] = useState<Payment>();
   const [deletingPayment, setDeletingPayment] = useState<boolean>(false);
   const payments = usePayments();
   const navigation = useNavigation();
   const theme = useTheme();
   const user = useUser();
   const styles = useStyles();

   const search = (sv: string | undefined) => {
      setSearchValue(sv);
      payments.get(sv);
   };

   const getNext = async () => {
      if (gettingNext.current) return;
      gettingNext.current = true;
      setLoading(true);
      await payments.get(searchValue);
      setLoading(false);
      gettingNext.current = false;
   };

   const deletePayment = async () => {
      setDeletingPayment(true);
      await payments.delete(paymentToDelete!.id);
      setPaymentToDelete(undefined);
      setDeletingPayment(false);
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
         <DeleteDialog
            loading={deletingPayment}
            visible={paymentToDelete !== undefined}
            title={paymentToDelete ? paymentToDelete.title : ""}
            type="payment"
            close={() => {
               setPaymentToDelete(undefined);
            }}
            delete={deletePayment}
         />
      </Page>
   );
};

export default PaymentsList;
