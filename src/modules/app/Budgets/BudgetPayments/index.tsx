import React, { useState, useEffect } from "react";
import { globalStyles, colors } from "styles";
import { View, Text, StyleSheet } from "react-native";
import { List, Empty, Icon } from "components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BudgetsRoute } from "../routes";
import { Payment, Budget } from "services/external/api/models/data";
import { formatDate } from "services/internal/datetime";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { toCurrency } from "services/internal/currency";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";

const styles = StyleSheet.create({
   container: {
      height: "100%",
      justifyContent: "space-between"
   },
   totalContainer: {
      paddingVertical: 20,
      paddingHorizontal: 10,
      backgroundColor: colors.white,
      width: "100%"
   },
   totalText: {
      fontSize: 24,
      color: colors.primary
   }
});

export interface BudgetPaymentParams {
   budget: Budget;
}

type ParamList = {
   "Budget": BudgetPaymentParams
}

type RouteProps = RouteProp<ParamList, "Budget">;

const BudgetPaymentsScreen: React.FC = () => {
   const payments = usePayments();
   const budgets = useBudgets();
   const navigation = useNavigation();
   const route = useRoute<RouteProps>();
   const [total, setTotal] = useState<string>()
   const [paymentsList, setPaymentsList] = useState<Payment[]>([]);
   const [paymentToRemove, setPaymentToRemove] = useState<Payment>();

   const viewPayment = (payment) => navigation.navigate(BudgetsRoute.Payment, { payment });

   const addNewPayment = () => navigation.navigate(BudgetsRoute.AddPayment, { budget: route.params.budget })

   const getPayments = () => {
      let p = route.params.budget.payments.map(x => x.paymentId);
      let nPayments = payments.values.filter(x => p.includes(x._id));
      setPaymentsList([...nPayments]);
   }

   const removePayment = async () => {
      if(!paymentToRemove)
         return;
      const b = route.params.budget;
      const index = b.payments.findIndex(x => x.paymentId === paymentToRemove._id);
      if(index === -1)
         return;
      await budgets.removePayment(b._id, paymentToRemove._id);
      setPaymentToRemove(undefined);
      getPayments();
   }

   const updatePayment = async (paymentId: string) => {
      const b = route.params.budget;
      const index = b.payments.findIndex(x => x.paymentId === paymentId);
      if(index === -1)
         return;
      const completed = b.payments[index].completed;
      await budgets.updatePayment(route.params.budget._id, paymentId, !completed);
      b.completed = !completed;
      navigation.setParams({ budget: b });
      getPayments();
   }

   useEffect(() => {
      const totalAmount = paymentsList.map(x => x.amount).reduce((acc, value) => Number(acc) + Number(value), 0);
      const total = toCurrency(totalAmount);
      setTotal(total);
   }, [paymentsList])

   useEffect(() => {
      const onFocus = navigation.addListener("focus", () => {
         const b = budgets.values.find(x => x._id === route.params.budget._id);
         navigation.setParams({ budget: b });
         getPayments();
      })
      return onFocus
   }, [navigation])

   useEffect(() => {
      if (!payments || paymentsList.length === 0) {
         navigation.setOptions({
            headerTintColor: colors.primary,
            headerTitleStyle: { color: colors.black }
         });
         return;
      }
      navigation.setOptions({
         title: route.params.budget.name,
         headerRight: () => (
            <Icon
               name="add"
               color={colors.primary}
               size={32}
               style={{ paddingRight: 20 }}
               onPress={() => addNewPayment()}
            />
         )
      })
   });

   if (!payments || paymentsList.length === 0) {
      return (
         <View style={globalStyles.container}>
            <Empty
               message="There are no Payments in this Budget yet!"
               addCreateNew={true}
               onCreateNewClick={() => addNewPayment()}
            />
         </View>
      )
   }

   return (
      <View style={styles.container}>
         <View style={globalStyles.listContainer}>
            {paymentToRemove &&
               <ConfirmDialog
                  visible={true}
                  title={`Delete ${paymentToRemove.name}`}
                  onTouchOutside={() => setPaymentToRemove(undefined)}
                  message="Are you sure you want to continue? This payment will be removed from this budget."
                  positiveButton={{
                     title: "Yes",
                     onPress: () => removePayment()
                  }}
                  negativeButton={{
                     title: "No",
                     onPress: () => setPaymentToRemove(undefined)
                  }}
               />}
            <List
               items={paymentsList.map(x => {
                  let rightContainerColor = colors.green, rightIconName = "check";
                  const payment = route.params.budget.payments.find(y => y.paymentId === x._id);
                  if (payment && payment.completed) {
                     rightContainerColor = colors.red;
                     rightIconName = "ban";
                  }
                  let icon = null;
                  let found = route.params.budget.payments.find(y => y.paymentId === x._id);
                  if (found && found.completed)
                     icon = <Icon name="check" color={colors.green} />;
                  return ({
                     id: x._id,
                     name: x.name,
                     description: x.dueDate && formatDate(x.dueDate),
                     icon: icon,
                     leftSwipeContent: { color: colors.red, iconName: "delete" },
                     rightSwipeContent: { color: colors.green, iconName: "check" },
                     onLeftActionRelease: () => setPaymentToRemove(x),
                     onRightActionRelease: () => updatePayment(x._id),
                     onPressAction: () => viewPayment(x)
                  })
               })} 
               onRefresh={() => getPayments()}
            />
         </View>
         <View style={[styles.totalContainer, globalStyles.shadow]}>
            <Text style={styles.totalText}>
               Total: {total}
            </Text>
         </View>
      </View>
   )
}

export default BudgetPaymentsScreen;