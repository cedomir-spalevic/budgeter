import React, { useRef } from "react";
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
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useIncomes } from "context";
import { TextInput } from "react-native";
import { RecurrenceLabels } from "services/external/api/models/data/recurrence";

export interface IncomeParams {
    income?: Income
}

type ParamList = {
    "Income": IncomeParams
}

type RouteProps = RouteProp<ParamList, "Income">

interface FormProps {
    label: string;
    numberPadRef: React.MutableRefObject<TextInput>;
}

interface FormValues {
    title: string;
    amount: number;
    repeat: string;
    occurrenceDate: string;
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
                    onSubmit={() => props.numberPadRef.current.focus()}
                />
                <NumberPad
                    preRenderIcon={<Icon name="attach-money" />}
                    placeholder="Amount"
                    value={props.values.amount}
                    textInputRef={props.numberPadRef}
                    onChange={props.handleChange("amount")}
                    errorMessage={props.touched.amount && props.errors.amount}
                />
                <PickerSelect 
                    preRenderIcon={<Icon name="repeat" />}
                    placeholder="Repeat?"
                    items={Object.keys(RecurrenceLabels)}
                    value={props.values.repeat}
                    onChange={props.handleChange("repeat")}
                    errorMessage={props.touched.repeat && props.errors.repeat}
                />
                <DatePicker
                    preRenderIcon={<Icon name="event" />}
                    placeholder="Occurrence Date"
                    value={props.values.occurrenceDate ? new Date(props.values.occurrenceDate) : undefined}
                    onChange={props.handleChange("occurrenceDate")}
                    errorMessage={props.touched.occurrenceDate && props.errors.occurrenceDate}
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
    const navigation = useNavigation();
    const incomes = useIncomes();
    const numberPadRef = useRef<TextInput>();

    const testForValidRepeat = (repeat: string) => (repeat in RecurrenceLabels)

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
            title: route.params?.income?.title,
            amount: route.params?.income?.amount,
            repeat: route.params?.income?.recurrence,
            occurrenceDate: route.params?.income?.occurrenceDate.toString()
        }),
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Title cannot be blank"),
            amount: Yup.number().required("Amount is required").min(0),
            repeat: Yup.string().required("Repeat is required")
                .test("validRepeat", `Repeat must be one of ${Object.keys(RecurrenceLabels).join(", ")}`, testForValidRepeat),
            occurrenceDate: Yup.string().required("Occurrence Date is required")
        //    email: Yup.string().required("Email cannot be blank"),
        //    password: Yup.string().required("Password cannot be blank")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
            const income: Partial<Income> = {
                title: values.title,
                amount: values.amount,
                recurrence: RecurrenceLabels[values.repeat],
                occurrenceDate: new Date(values.occurrenceDate)
            }
            await incomes.create(income);
            navigation.goBack();
        }
     })(IncomeForm);

    return (
        <Page>
            <Form
                label={route.params && route.params.income ? "Update Income" : "Create Income"}
                numberPadRef={numberPadRef}
            />
        </Page>
    )
}

export default IncomeScreen;