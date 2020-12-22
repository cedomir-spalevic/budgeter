import React from "react";
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
import { Payment } from "services/external/api/models/data";
import { View, ActivityIndicator } from "react-native";
import { usePayments } from "context/Payments";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";

export interface PaymentParams {
   payment?: Payment;
   budgetId?: string;
}

type ParamList = {
   "Payment": PaymentParams
}

type RouteProps = RouteProp<ParamList, "Payment">;

interface FormValues {
   name: string;
   amount: number;
   dueDate: string;
   formError: string;
}

interface Props {
   buttonText: string;
}

const PaymentFormView = (props: Props & FormikProps<FormValues>) => {
   return (
      <>
         <View style={globalStyles.inputContainer}>
            <TextField
               preRenderIcon={<Icon name="label" />}
               placeholder="Enter the name"
               errorMessage={props.touched.name && props.errors.name}
               onChange={props.handleChange("name")}
               value={props.values.name}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <NumberPad
               value={props.values.amount}
               preRenderIcon={<Icon name="attach-money" />}
               placeholder="Enter the amount"
               errorMessage={props.touched.amount && props.errors.amount}
               onChange={n => props.setFieldValue("amount", n)}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <DatePicker
               date={props.values.dueDate && new Date(props.values.dueDate)}
               preRenderIcon={<Icon name="event" />}
               placeholder="Enter a due date"
               onChange={d => props.setFieldValue("dueDate", d)}
               errorMessage={props.touched.dueDate && props.errors.dueDate}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <Button
               onPress={props.handleSubmit}
               children={props.isSubmitting ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
               text={props.isSubmitting ? undefined : props.buttonText}
            />
         </View>
         <FormError
            visible={Boolean(props.errors.formError)}
            message={props.errors.formError}
         />
      </>
   )
}

const PaymentForm: React.FC = () => {
   const navigation = useNavigation();
   const route = useRoute<RouteProps>();
   const payments = usePayments();

   const Form = withFormik<Props, FormValues>({
      mapPropsToValues: (props: Props) => ({
         name: route.params?.payment?.name,
         dueDate: route.params?.payment?.dueDate.toISOString(),
         amount: route.params?.payment?.amount,
         formError: ""
      }),
      validationSchema: Yup.object().shape({
         name: Yup.string().required("Name cannot be blank"),
         amount: Yup.number().moreThan(0, "Amount must be greater than 0"),
         dueDate: Yup.string().required("Due Date cannot be blank")
      }),
      handleSubmit: async (values: FormValues, formikBag: FormikBag<Props, FormValues>)  => {
         const payment: Partial<Payment> = {
            name: values.name,
            amount: values.amount,
            dueDate: new Date(values.dueDate)
         };
         if(route.params && route.params.payment) {
            const response = await payments.updatePayment(route.params.payment._id, payment);
            if(!response)
               navigation.goBack();
            formikBag.setErrors({
               formError: response.formError
            })
         }
         else {
            const response = await payments.createPayment(payment);
            if(!response)
               navigation.goBack();
            formikBag.setErrors({
               formError: response.formError
            })
         }
      }
   })(PaymentFormView);

   return (
      <Form
         buttonText={`${route.params?.payment?._id ? "Update" : "Create"} Payment`} 
      />
   )
}

export default PaymentForm;