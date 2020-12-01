import React, { useState, useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
   TextField,
   DatePicker,
   NumberPad,
   Button,
   Icon,
   FormError
} from "components";
import { globalStyles, colors } from "styles";
import { Payment } from "services/external/api/models";
import { View, ActivityIndicator } from "react-native";
import { usePayments } from "context/Payments";

export interface PaymentParams {
   payment?: Payment;
}

type ParamList = {
   "Payment": PaymentParams
}

type RouteProps = RouteProp<ParamList, "Payment">;

const PaymentForm: React.FC = () => {
   const payments = usePayments();
   const navigation = useNavigation();
   const route = useRoute<RouteProps>();
   const [name, setName] = useState<string>();
   const [nameError, setNameError] = useState<string>();
   const [amount, setAmount] = useState<number>();
   const [amountError, setAmountError] = useState<string>();
   const [dueDate, setDueDate] = useState<Date>();
   const [sendingRequest, setSendingRequest] = useState<boolean>(false);
   const [submit, setSubmit] = useState<boolean>(false);
   const [formError, setFormError] = useState<string>();

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

   const onPaymentSave = () => {
      validateName(name);
      validateAmount(amount);
      setSubmit(true);
   }

   const submitForm = async () => {
      setSendingRequest(true);
      const payment: Payment = {
         paymentId: (route.params.payment ? route.params.payment.paymentId : undefined),
         name: name,
         amount: amount,
         dueDate: dueDate
      }
      const saved = await payments.paymentOnSave(payment);
      setSendingRequest(false);
      setSubmit(false);
      if (!saved)
         setFormError("Unable to create Payment");
      else
         navigation.goBack();
   }

   useEffect(() => {
      if (!submit)
         return;
      if (nameError || amountError) {
         setSubmit(false);
         return;
      }
      submitForm();
   }, [submit])

   useEffect(() => {
      const payment: Payment = route.params?.payment;
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
               onPress={() => onPaymentSave()}
               children={sendingRequest ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
               text={sendingRequest ? undefined : `${route.params?.payment?.paymentId ? "Update" : "Create"} Payment`}
            />
         </View>
         <FormError
            visible={formError !== undefined}
            message={formError}
         />
      </React.Fragment>
   )
}

export default PaymentForm;