import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { globalStyles, colors } from "styles";
import { Label, Icon } from "components";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { BudgetsRoute } from "../routes";
import { Payment, Budget } from "services/external/api/models";
import { usePayments } from "context/Payments/context";
import { useBudgets } from "context/Budgets/context";

const styles = StyleSheet.create({
   decisionContainer: {
      marginBottom: 20,
      backgroundColor: colors.white,
      borderRadius: 5,
      width: "100%",
      padding: 20,
      flexDirection: "row",
      alignItems: "center"
   },
   decisionContainerText: {
      fontSize: 18
   },
   icons: {
      fontSize: 18,
      color: colors.primary,
      paddingRight: 10
   }
})

export interface NewBudgetPaymentParams {
   budget: Budget;
}

type ParamList = {
   "Budget": NewBudgetPaymentParams
}

type RouteProps = RouteProp<ParamList, "Budget">;

const NewBudgetPaymentScreen: React.FC = () => {
   const navigation = useNavigation();
   const route = useRoute<RouteProps>();
   const payments = usePayments();
   const budgets = useBudgets();

   const onCreateNewPaymentSave = async (payment: Payment) => {
      const newPayment = await payments.paymentOnSave(payment);
      if (newPayment.paymentId) {
         const budgetPaymentSaved = await budgets.addPayment(route.params.budget, newPayment.paymentId);
         navigation.goBack();
         navigation.goBack();
      }
      return newPayment;
   }

   const onAddExistingPaymentsSave = async (payments: Payment[]) => {
      await Promise.all(payments.map(async x => await budgets.addPayment(route.params.budget, x.paymentId)));
      navigation.goBack();
      navigation.goBack();
   }

   const createNewPayment = () => {
      navigation.navigate(BudgetsRoute.NewPayment, { onSave: onCreateNewPaymentSave });
   }

   const addExistingPayment = () => {
      navigation.navigate(BudgetsRoute.AddExistingPayments, { 
         budget: route.params.budget, 
         onSave: onAddExistingPaymentsSave 
      });
   }

   return (
      <View style={[globalStyles.container, globalStyles.verticallyCentered]}>
         <TouchableOpacity style={styles.decisionContainer} onPress={addExistingPayment}>
            <Icon name="list" style={styles.icons} />
            <Label text="Add Existing Payment" size={18} color={colors.primary} />
         </TouchableOpacity>
         <TouchableOpacity style={styles.decisionContainer} onPress={createNewPayment}>
            <Icon name="add-circle-outline" style={styles.icons} />
            <Label text="Create New Payment" size={18} color={colors.primary} />
         </TouchableOpacity>
      </View>
   )
}

export default NewBudgetPaymentScreen;