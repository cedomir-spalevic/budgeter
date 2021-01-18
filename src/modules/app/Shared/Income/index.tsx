import React from "react";
import { 
    Button, 
    Container, 
    Icon, 
    KeyboardAccessory, 
    Label, 
    Page,
    TextField,
    NumberPad,
    PickerSelect,
    DatePicker,
    Spacer
} from "components";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { Income } from "services/external/api/models/data/income";
import { RouteProp, useRoute } from "@react-navigation/native";

export interface IncomeParams {
    income?: Income
}

type ParamList = {
    "Income": IncomeParams
}

type RouteProps = RouteProp<ParamList, "Income">

interface FormProps {
    label: string;
}

interface FormValues {
    title: string;
    amount: number;
}

const IncomeForm = (props: FormProps & FormikProps<FormValues>) => {
    return (
        <>
            <Container allowScroll flex>
                <Label type="header" text={props.label} />
                <Spacer />
                <TextField
                    preRenderIcon={<Icon name="title" />}
                    errorMessage={props.touched.title && props.errors.title}
                    onChange={props.handleChange("title")}
                    value={props.values.title}
                    placeholder="Title"
                    autoFocus
                />
                <NumberPad
                    preRenderIcon={<Icon name="attach-money" />}
                    placeholder="Amount"
                    value={props.values.amount}
                />
                <PickerSelect 
                    preRenderIcon={<Icon name="repeat" />}
                    placeholder="Repeat?"
                    items={[
                        { label: "None", value: "none" },
                        { label: "Daily", value: "daily" },
                        { label: "Weekly", value: "weekly" },
                        { label: "Biweekly", value: "biweekly" },
                        { label: "Monthly", value: "monthly" },
                        { label: "Yearly", value: "yearly" }
                    ]}
                />
                <DatePicker
                    placeholder="Start Date"
                />
            </Container>
            <KeyboardAccessory justifyContent="flex-end">
                <Button onPress={props.handleSubmit} text="Save" />
            </KeyboardAccessory>
        </>
     )
}

const IncomeScreen: React.FC = () => {
    const route = useRoute<RouteProps>();

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
            title: route.params?.income?.title,
            amount: route.params?.income?.amount
        }),
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Title cannot be blank")
        //    email: Yup.string().required("Email cannot be blank"),
        //    password: Yup.string().required("Password cannot be blank")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
        }
     })(IncomeForm);

    return (
        <Page>
            <Form
                label={route.params && route.params.income ? "Update Income" : "Create Income"}
            />
        </Page>
    )
}

export default IncomeScreen;