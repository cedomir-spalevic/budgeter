import React, { useContext, useState, useEffect } from "react";
import { globalStyles, colors } from "styles";
import { View } from "react-native";
import { List, Empty, SwipeContainer, Icon } from "components";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BudgetsRoute } from "../routes";
import { BudgetsContext } from "context/Budgets";
import { PaymentsContext } from "context/Payments";
import { Payment, Budget } from "services/api/models";
import { formatDate } from "services/utils/datetime";
import Toast from "react-native-root-toast";
import { ConfirmDialog } from "react-native-simple-dialogs";

export interface BudgetPaymentParams {
   budget: Budget;
}

type ParamList = {
   "Budget": BudgetPaymentParams
}

type RouteProps = RouteProp<ParamList, "Budget">;

const BudgetPaymentsScreen: React.FC = () => {
   const paymentsContext = useContext(PaymentsContext);
   const budgetsContext = useContext(BudgetsContext);
   const navigation = useNavigation();
   const route = useRoute<RouteProps>();
   const [payments, setPayments] = useState<Payment[]>([]);
   const [paymentToRemove, setPaymentToRemove] = useState<Payment>();

   useEffect(() => {
      getPayments();
   }, [])

   const getPayments = () => {
      let p = route.params.budget.payments.map(x => x.paymentId);
      let nPayments = paymentsContext.payments.filter(x => p.includes(x.paymentId));
      setPayments([...nPayments]);
   }

   const syncBudget = () => {
      let budget = budgetsContext.budgets.find(x => x.budgetId === route.params.budget.budgetId);
      navigation.setParams({ budget })
      getPayments();
   }

   if (!payments || payments.length === 0) {
      navigation.setOptions({
         headerTintColor: colors.primary,
         headerTitleStyle: { color: colors.black }
      })
      return (
         <View style={globalStyles.container}>
            <Empty
               message="There are no Payments in this Budget yet!"
               addCreateNew={true}
               onCreateNewClick={() => {
                  navigation.navigate(BudgetsRoute.AddPayment, { budget: route.params.budget, onSave: syncBudget });
               }}
            />
         </View>
      )
   }

   navigation.setOptions({
      title: route.params.budget.name,
      headerRight: () => (
         <Icon
            name="add"
            color={colors.primary}
            size={32}
            style={{ paddingRight: 20 }}
            onPress={() => {
               navigation.navigate(BudgetsRoute.AddPayment, { budget: route.params.budget, onSave: syncBudget });
            }}
         />
      )
   })

   const removePayment = async () => {
      try {
         const removed = await budgetsContext.removePayment(route.params.budget, paymentToRemove.paymentId);
         if(!removed)
            throw new Error();
         const newBudget = route.params.budget;
         newBudget.payments = newBudget.payments.filter(x => x.paymentId !== paymentToRemove.paymentId);
         let nPayments = paymentsContext.payments.filter(x => x.paymentId !== paymentToRemove.paymentId);
         setPaymentToRemove(undefined);
         setPayments([...nPayments]);
         navigation.setParams({ budget: newBudget });
      }
      catch (error) {
         Toast.show("Unable to remove Payment from Budget");
      }
   }

   const finishPayment = async (paymentId: string) => {
      let budgetPayment = route.params.budget.payments.find(x => x.paymentId === paymentId);

      try {
         let newBudget = await budgetsContext.completePayment(route.params.budget, paymentId, !budgetPayment.completed);
         let paymentIds = newBudget.payments.map(x => x.paymentId);
         let nPayments = paymentsContext.payments.filter(x => paymentIds.includes(x.paymentId));
         setPayments([...nPayments]);
         navigation.setParams({ budget: newBudget })
      }
      catch (error) {
         Toast.show(`Unable to ${budgetPayment.completed ? "complete" : "uncomplete"} Payment`);
      }
   }

   return (
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
            items={payments.map(x => {
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
                  onRightActionRelease: () => finishPayment(x.paymentId)
               })
            })} 
            onRefresh={() => getPayments()}
         />
      </View>
   )
}

export default BudgetPaymentsScreen;