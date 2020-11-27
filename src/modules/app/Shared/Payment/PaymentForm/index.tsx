import React, { useState, useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
   TextField,
   DatePicker,
   NumberPad,
   Button,
   Icon
} from "components";
import { globalStyles, colors } from "styles";
import { Payment } from "services/external/api/models";
import { View, ActivityIndicator } from "react-native";

export interface PaymentParams {
   payment?: Payment;
   onSave: (payment: Payment) => Promise<boolean>;
}

type ParamList = {
   "Payment": PaymentParams
}

type RouteProps = RouteProp<ParamList, "Payment">;

const PaymentForm: React.FC = () => {
   const navigation = useNavigation();
   const route = useRoute<RouteProps>();
   const [name, setName] = useState<string>();
   const [nameError, setNameError] = useState<string>();
   const [amount, setAmount] = useState<number>();
   const [amountError, setAmountError] = useState<string>();
   const [dueDate, setDueDate] = useState<Date>();
   const [sendingRequest, setSendingRequest] = useState<boolean>(false);
   const [submit, setSubmit] = useState<boolean>(false);

   const validateName = (value) => {
      let error = undefined;
      if (value === undefined || value.length === 0)
         error = "Name cannot be blank";
      setNameError(error);
   }

   const onNameChange = (newValue) => {
      setName(newValue);
      validateName(newValue);
   }

   const validateAmount = (value) => {
      let error = undefined;
      if (value === undefined)
         error = "Amount cannot be blank";
      setAmountError(error);
   }

   const onAmountChange = (newValue) => {
      setAmount(newValue);
      validateAmount(newValue);
   }

   const onDueDateChange = (newValue) => {
      setDueDate(newValue);
   }

   const submitPayment = () => {
      validateName(name);
      validateAmount(amount);
      setSubmit(true);
   }

   useEffect(() => {
      if (!submit)
         return;
      if (nameError || amountError) {
         setSubmit(false);
         return;
      }
      (async () => {
         setSendingRequest(true);
         const payment: Payment = {
            paymentId: (route.params.payment ? route.params.payment.paymentId : undefined),
            name: name,
            amount: amount,
            dueDate: dueDate
         }
         const response = await route.params.onSave(payment);
         if (!response) {
            setSendingRequest(false);
            setSubmit(false);
         }
      })();
   }, [submit])

   useEffect(() => {
      const payment: Payment = route.params.payment;
      if (payment) {
         onNameChange(payment.name);
         onAmountChange(payment.amount);
         onDueDateChange(payment.dueDate);
      }
   }, [])

   return (
      <React.Fragment>
         <View style={globalStyles.inputContainer}>
            <TextField
               value={name}
               preRenderIcon={<Icon name="label" />}
               placeholder="Enter the name"
               errorMessage={nameError}
               onChange={nt => onNameChange(nt)}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <NumberPad
               value={amount}
               preRenderIcon={<Icon name="attach-money" />}
               placeholder="Enter the amount"
               errorMessage={amountError}
               onChange={nv => onAmountChange(nv)}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <DatePicker
               date={dueDate}
               preRenderIcon={<Icon name="event" />}
               placeholder="Enter a due date"
               onChange={nd => onDueDateChange(nd)}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <Button
               onPress={() => submitPayment()}
               children={sendingRequest ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
               text={sendingRequest ? undefined : `${route.params.payment && route.params.payment.paymentId ? "Update" : "Create"} Payment`}
            />
         </View>
      </React.Fragment>
   )
}

export default PaymentForm;