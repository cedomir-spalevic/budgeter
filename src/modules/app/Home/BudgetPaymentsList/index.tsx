import React, { useCallback, useEffect, useState } from "react";
import {
   Page,
   Container,
   ActionList,
   Label,
   SummaryView,
   Searchbox,
   ActionItem
} from "components";
import { makeStyles, useTheme, useUser } from "context";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { BudgetPayment } from "services/models/data/payment";
import HomeRoutes from "../routes";
import DeleteDialog from "modules/app/Shared/DeleteDialog";

const useStyles = makeStyles(() => ({
   summaryView: {
      flexDirection: "row"
   },
   summaryLabel: {
      paddingRight: 5
   }
}));

const BudgetPaymentsList: React.FC = () => {
   const [list, setList] = useState<BudgetPayment[]>([]);
   const [paymentToDelete, setPaymentToDelete] = useState<BudgetPayment>();
   const [deletingPayment, setDeletingPayment] = useState<boolean>(false);
   const budgets = useBudgets();
   const payments = usePayments();
   const navigation = useNavigation();
   const theme = useTheme();
   const user = useUser();
   const styles = useStyles();
   const setBudgetPayments = useCallback(() => {
      setList([...budgets.value.payments]);
   }, [budgets.value.payments]);

   const onSearch = (searchValue: string | undefined) => {
      const normalizedValue = searchValue
         ? searchValue.trim().toLowerCase()
         : "";
      const filteredList = budgets.value.payments.filter((x) =>
         x.title.trim().toLowerCase().includes(normalizedValue)
      );
      setList([...filteredList]);
   };

   const deletePayment = async () => {
      setDeletingPayment(true);
      await payments.delete(paymentToDelete!.id);
      setPaymentToDelete(undefined);
      setDeletingPayment(false);
   };

   useEffect(() => {
      setBudgetPayments();
   }, [setBudgetPayments]);

   return (
      <Page>
         <Container title="Payments" allowScroll fullWith>
            <Container>
               <ActionItem title={<Label type="header" text="Payments" />}>
                  <Searchbox
                     placeholder="Search Payments"
                     onChange={onSearch}
                  />
               </ActionItem>
            </Container>
            <Container fullWith>
               <ActionList
                  items={list.map((x) => {
                     let swipeContentKey = "leftSwipeContent";
                     let actionReleaseKey = "onLeftActionRelease";
                     if (user.swipeOptions.deletePayment === "right") {
                        swipeContentKey = "rightSwipeContent";
                        actionReleaseKey = "onRightActionRelease";
                     }
                     return {
                        id: x.id,
                        text: x.title,
                        note: {
                           text: `${toCurrency(x.amount)} (x${
                              x.numberOfOccurrences
                           })`,
                           color: "red"
                        },
                        onPress: () =>
                           navigation.navigate(HomeRoutes.Payment, {
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
         </Container>
         <Container fullWith>
            <SummaryView>
               <View style={styles.summaryView}>
                  <Label
                     text="Total:"
                     type="regular"
                     color={theme.value.palette.primary}
                     style={styles.summaryLabel}
                  />
                  <Label
                     text={toCurrency(
                        list
                           .map((x) => x.totalAmount)
                           .reduce((p, c) => p + c, 0)
                     )}
                     type="regular"
                  />
               </View>
            </SummaryView>
         </Container>
         <DeleteDialog
            loading={deletingPayment}
            visible={paymentToDelete !== undefined}
            title={paymentToDelete ? paymentToDelete.title : ""}
            type={"payment"}
            close={() => {
               setPaymentToDelete(undefined);
            }}
            delete={deletePayment}
         />
      </Page>
   );
};

export default BudgetPaymentsList;
