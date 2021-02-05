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
import { useIncomes } from "context/Incomes";
import { TextInput } from "react-native";
import { RecurrenceLabels, RecurrenceMap } from "services/external/api/models/data/recurrence";

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
    initialOccurrenceDate: string;
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
                    placeholder="Initial Occurrence Date"
                    value={props.values.initialOccurrenceDate ? new Date(props.values.initialOccurrenceDate) : undefined}
                    onChange={props.handleChange("initialOccurrenceDate")}
                    errorMessage={props.touched.initialOccurrenceDate && props.errors.initialOccurrenceDate}
                />
            </Container>
            <KeyboardAccessory justifyContent="flex-end">
                <Button onPress={props.handleSubmit} text="Save" loading={props.isSubmitting} />
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
            repeat: route.params?.income?.recurrence && RecurrenceMap[route.params?.income?.recurrence],
            initialOccurrenceDate: (route.params?.income ? new Date(route.params.income.initialYear, route.params.income.initialMonth, route.params.income.initialDay).toString() 
                                        : undefined)
        }),
        validationSchema: Yup.object().shape({
            title: Yup.string().required("Title cannot be blank"),
            amount: Yup.number().required("Amount is required").min(0),
            repeat: Yup.string().required("Repeat is required")
                .test("validRepeat", `Repeat must be one of ${Object.keys(RecurrenceLabels).join(", ")}`, testForValidRepeat),
            initialOccurrenceDate: Yup.string().required("Initial Occurrence Date is required")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
            const initialOccurenceDate = new Date(values.initialOccurrenceDate);
            const income: Partial<Income> = {
                title: values.title,
                amount: Number(values.amount)/100,
                recurrence: RecurrenceLabels[values.repeat],
                initialDay: initialOccurenceDate.getDate(),
                initialMonth: initialOccurenceDate.getMonth(),
                initialYear: initialOccurenceDate.getFullYear()
            }
            if(route.params?.income?.id) {
                const updated = await incomes.update(route.params?.income?.id, income);
                if(updated)
                    navigation.goBack();
            }
            else {
                const created = await incomes.create(income);
                if(created)
                    navigation.goBack();
            }
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