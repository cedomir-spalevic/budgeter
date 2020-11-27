import React, { useContext, useState, useEffect } from "react";
import { PaymentsContext } from "context/Payments";
import { globalStyles, colors } from "styles";
import { ListItem, Icon, Empty } from "components";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { formatDate } from "services/internal/datetime";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { Payment, Budget } from "services/external/api/models";
import { BudgetsContext } from "context/Budgets";

export interface AddExistingPaymentParams {
   budget: Budget;
   onSave: (payments: Payment[]) => Promise<void>;
}

type ParamList = {
   "AddExistingPaymentParams": AddExistingPaymentParams
}

type RouteProps = RouteProp<ParamList, "AddExistingPaymentParams">;

const AddExistingPayments: React.FC = () => {
   const navigation = useNavigation();
   const route = useRoute<RouteProps>();
   const budgetsContext = useContext(BudgetsContext);
   const paymentsContext = useContext(PaymentsContext);
   const [paymentsAllowedToAdd, setPaymentsAllowedToAdd] = useState<Payment[]>([]);
   const [paymentsToAdd, setPaymentsToAdd] = useState<Payment[]>([]);

   useEffect(() => {
      let nPaymentsAllowedToAdd = paymentsContext.payments;
      if (route.params.budget.payments) {
         const paymentIds = route.params.budget.payments.map(x => x.paymentId);
         nPaymentsAllowedToAdd = nPaymentsAllowedToAdd.filter(x => !paymentIds.includes(x.paymentId));
      }
      setPaymentsAllowedToAdd([...nPaymentsAllowedToAdd])
   }, [])

   const togglePayment = (id) => {
      let index = paymentsToAdd.findIndex(x => x.paymentId === id);
      if (index === -1)
         paymentsToAdd.push(paymentsContext.payments.find(x => x.paymentId === id))
      else
         paymentsToAdd.splice(index, 1);
      setPaymentsToAdd([...paymentsToAdd])
   }

   const save = () => {
      navigation.setOptions({
         headerRight: () => <ActivityIndicator size="small" color={colors.primary} style={{ paddingRight: 20 }} />
      })
      route.params.onSave(paymentsToAdd);
   }

   navigation.setOptions({
      headerRight: () => {
         if (paymentsToAdd.length === 0)
            return null;
         return (
            <Text
               onPress={() => save()}
               style={{ paddingRight: 20, color: colors.primary, fontSize: 18 }}
            >
               Save
            </Text>
         )
      }
   })

   if (paymentsAllowedToAdd.length === 0)
      return (
         <Empty 
            message="You don't have any Payments yet!" 
            addCreateNew={false}
         />
      )

   return (
      <View style={globalStyles.listContainer}>
         <FlatList
            data={paymentsAllowedToAdd.map(x => {
               let name = "fiber-manual-record", color = colors.secondaryDarker;
               if (paymentsToAdd.includes(x)) {
                  name = "check-circle";
                  color = colors.green;
               }
               return ({
                  id: x.paymentId,
                  name: x.name,
                  description: x.dueDate && `${formatDate(x.dueDate)}`,
                  icon: (
                     <Icon
                        name={name}
                        size={24}
                        style={{ color: color, position: "absolute", top: "50%", right: "5%" }}
                     />
                  ),
                  onPressAction: () => togglePayment(x.paymentId)
               })
            })}
            scrollEnabled={false}
            renderItem={({ item }) => (
               <ListItem
                  item={item}
               />
            )}
         />
      </View>
   )
}

export default AddExistingPayments;