import React, { useState, useEffect } from "react";
import { Budget } from "services/external/api/models";
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

export interface BudgetParams {
   budget?: Budget;
}

type ParamList = {
   "Budget": BudgetParams
}

type RouteProps = RouteProp<ParamList, "Budget">;

const BudgetForm: React.FC = () => {
   const budgets = useBudgets();
   const navigation = useNavigation();
   const route = useRoute<RouteProps>();
   const [name, setName] = useState<string>();
   const [nameError, setNameError] = useState<string>();
   const [startDate, setStartDate] = useState<Date>();
   const [startDateError, setStartDateError] = useState<string>();
   const [endDate, setEndDate] = useState<Date>();
   const [endDateError, setEndDateError] = useState<string>();
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

   const validateStartDate = (value) => {
      let error = undefined;
      if (value === undefined)
         error = "Start Date cannot be blank";
      setStartDateError(error);
   }

   const onStartDateChange = (newValue) => {
      setStartDate(newValue);
      validateStartDate(newValue);
   }

   const validateEndDate = (value) => {
      let error = undefined;
      if (value === undefined)
         error = "End Date cannot be blank";
      if (!error && startDate !== undefined && value <= startDate)
         error = "End Date must be after Start Date";
      setEndDateError(error);
   }

   const onEndDateChange = (newValue) => {
      setEndDate(newValue);
      validateEndDate(newValue);
   }

   const onBudgetSave = () => {
      validateName(name);
      validateStartDate(startDate);
      validateEndDate(endDate);
      setSubmit(true);
   }

   const submitForm = async () => {
      setSendingRequest(true);
      const budget: Budget = {
         budgetId: (route.params.budget && route.params.budget.budgetId ? route.params.budget.budgetId : undefined),
         name,
         startDate,
         endDate,
         completed: (route.params.budget ? route.params.budget.completed : false)
      };
      const saved = await budgets.budgetOnSave(budget);
      setSendingRequest(false);
      setSubmit(false);
      if (!saved)
         setFormError("Unable to create Budget");
      else
         navigation.goBack();
   }

   useEffect(() => {
      if (!submit)
         return;
      if (nameError || startDateError || endDateError) {
         setSubmit(false);
         return;
      }
      submitForm();
   }, [submit])

   useEffect(() => {
      const budget: Budget = route.params.budget;
      if (budget !== undefined) {
         onNameChange(budget.name);
         onStartDateChange(budget.startDate);
         onEndDateChange(budget.endDate);
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
            <DatePicker
               date={startDate}
               preRenderIcon={<Icon name="event" />}
               placeholder="Enter a start date"
               errorMessage={startDateError}
               onChange={nd => onStartDateChange(nd)}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <DatePicker
               date={endDate}
               preRenderIcon={<Icon name="event" />}
               placeholder="Enter an end date"
               errorMessage={endDateError}
               onChange={nd => onEndDateChange(nd)}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <Button
               onPress={() => onBudgetSave()}
               children={sendingRequest ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
               text={sendingRequest ? undefined : `${route.params.budget && route.params.budget.budgetId ? "Update" : "Create"} Budget`}
            />
         </View>
         <FormError
            visible={formError !== undefined}
            message={formError}
         />
      </React.Fragment>
   )
}


export default BudgetForm;