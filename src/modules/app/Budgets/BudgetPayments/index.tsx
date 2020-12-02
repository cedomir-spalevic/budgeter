import React, { useState, useEffect } from "react";
import { globalStyles, colors } from "styles";
import { View, Text, StyleSheet } from "react-native";
import { List, Empty, Icon } from "components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BudgetsRoute } from "../routes";
import { Payment, Budget } from "services/external/api/models";
import { formatDate } from "services/internal/datetime";
import Toast from "react-native-root-toast";
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
      let nPayments = payments.payments.filter(x => p.includes(x.paymentId));
      setPaymentsList([...nPayments]);
   }

   const syncBudget = () => {
      let budget = budgets.budgets.find(x => x.budgetId === route.params.budget.budgetId);
      navigation.setParams({ budget })
      getPayments();
   }

   const removePayment = async () => {
      try {
         const removed = await budgets.removePayment(route.params.budget, paymentToRemove.paymentId);
         if(!removed)
            throw new Error();
         const newBudget = route.params.budget;
         newBudget.payments = newBudget.payments.filter(x => x.paymentId !== paymentToRemove.paymentId);
         let nPayments = payments.payments.filter(x => x.paymentId !== paymentToRemove.paymentId);
         setPaymentToRemove(undefined);
         setPaymentsList([...nPayments]);
         navigation.setParams({ budget: newBudget });
      }
      catch (error) {
         Toast.show("Unable to remove Payment from Budget");
      }
   }

   const finishPayment = async (paymentId: string) => {
      let budgetPayment = route.params.budget.payments.find(x => x.paymentId === paymentId);

      try {
         let newBudget = await budgets.completePayment(route.params.budget, paymentId, !budgetPayment.completed);
         let paymentIds = newBudget.payments.map(x => x.paymentId);
         let nPayments = payments.payments.filter(x => paymentIds.includes(x.paymentId));
         setPaymentsList([...nPayments]);
         navigation.setParams({ budget: newBudget })
      }
      catch (error) {
         Toast.show(`Unable to ${budgetPayment.completed ? "complete" : "uncomplete"} Payment`);
      }
   }

   useEffect(() => {
      const totalAmount = paymentsList.map(x => x.amount).reduce((acc, value) => Number(acc) + Number(value), 0);
      const total = toCurrency(totalAmount);
      setTotal(total);
   }, [paymentsList])

   useEffect(() => {
      getPayments();
   }, [payments.payments])

   useEffect(() => {
      syncBudget();
   }, [budgets.budgets])   

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
                  const payment = route.params.budget.payments.find(y => y.paymentId === x.paymentId);
                  if (payment && payment.completed) {
                     rightContainerColor = colors.red;
                     rightIconName = "ban";
                  }
                  let icon = null;
                  let found = route.params.budget.payments.find(y => y.paymentId === x.paymentId);
                  if (found && found.completed)
                     icon = <Icon name="check" color={colors.green} />;
                  return ({
                     id: x.paymentId,
                     name: x.name,
                     description: x.dueDate && formatDate(x.dueDate),
                     icon: icon,
                     leftSwipeContent: { color: colors.red, iconName: "delete" },
                     rightSwipeContent: { color: colors.green, iconName: "check" },
                     onLeftActionRelease: () => setPaymentToRemove(x),
                     onRightActionRelease: () => finishPayment(x.paymentId),
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