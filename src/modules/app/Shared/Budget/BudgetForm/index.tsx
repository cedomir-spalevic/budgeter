import React from "react";
import { Budget } from "services/external/api/models/data";
import { globalStyles, colors } from "styles";
import {
   View,
   ActivityIndicator
} from "react-native";
import {
   TextField,
   DatePicker,
   Button,
   Icon, FormError
} from "components";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useBudgets } from "context/Budgets";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";

export interface BudgetParams {
   budget?: Budget;
}

type ParamList = {
   "Budget": BudgetParams
}

type RouteProps = RouteProp<ParamList, "Budget">;

interface FormValues {
   name: string;
   startDate: string;
   endDate: string;
   formError: string;
}

interface Props {
   buttonText: string;
}

const BudgetFormView = (props: Props & FormikProps<FormValues>) => {
   return (
      <>
         <View style={globalStyles.inputContainer}>
             <TextField
               value={props.values.name}
               preRenderIcon={<Icon name="label" />}
               placeholder="Enter the name"
               errorMessage={props.touched.name && props.errors.name}
               onChange={props.handleChange("name")}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <DatePicker
               date={props.values.startDate && new Date(props.values.startDate)}
               preRenderIcon={<Icon name="event" />}
               placeholder="Select a start date"
               errorMessage={props.touched.startDate && props.errors.startDate}
               onChange={d => props.handleChange("startDate")(d.toISOString())}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <DatePicker
               date={props.values.endDate && new Date(props.values.endDate)}
               preRenderIcon={<Icon name="event" />}
               placeholder="Enter an end date"
               errorMessage={props.touched.endDate && props.errors.endDate}
               onChange={d => props.handleChange("endDate")(d.toISOString())}
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

const BudgetForm: React.FC = () => {
   const budgets = useBudgets();
   const navigation = useNavigation();
   const route = useRoute<RouteProps>();

   function checkIfEndDateIsAfterStartDate(value: string): boolean {
      const startDate = this.resolve(Yup.ref("startDate"));
      return startDate && value && new Date(value) > new Date(startDate);
   }

   const Form = withFormik<Props, FormValues>({
      mapPropsToValues: (props: Props) => ({
         name: "",
         startDate: "",
         endDate: "",
         formError: ""
      }),
      validationSchema: Yup.object().shape({
         name: Yup.string().required("Name cannot be blank"),
         startDate: Yup.string().required("Start Date cannot blank"),
         endDate: Yup.string().required("End Date cannot be blank")
            .test("endDateIsAfterStartDate", "End Date must be after Start Date", checkIfEndDateIsAfterStartDate)
      }),
      handleSubmit: async (values: FormValues, formikBag: FormikBag<Props, FormValues>)  => {
         const budget: Partial<Budget> = {
            name: values.name,
            startDate: new Date(values.startDate),
            endDate: new Date(values.endDate)
         }
         const response = await budgets.createBudget(budget);
         if(response) {
            formikBag.setErrors({
               formError: response.formError
            })
         }
         else
            navigation.goBack();
      }
   })(BudgetFormView);

   return (
      <Form 
         buttonText={`${route.params?.budget?._id ? "Update" : "Create"} Budget`} 
      />
   )
}

export default BudgetForm;