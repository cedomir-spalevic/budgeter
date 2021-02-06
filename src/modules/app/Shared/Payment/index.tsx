import React, { useRef } from "react";
import { 
    Button, 
    Container, 
    DatePicker, 
    Icon, 
    KeyboardAccessory, 
    Label, 
    NumberPad, 
    Page,
    PickerSelect,
    Spacer,
    TextField
} from "components";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Payment } from "services/external/api/models/data/payment";
import { TextInput } from "react-native";
import { RecurrenceLabels, RecurrenceMap } from "services/external/api/models/data/recurrence";
import { usePayments } from "context";
import { PickerSelectRef } from "components/PickerSelect";
import { DatePickerRef } from "components/DatePicker";

export interface PaymentParams {
    payment?: Payment;
}

type ParamList = {
    "Payment": PaymentParams;
}

type RouteProps = RouteProp<ParamList, "Payment">

interface FormProps {
    label: string;
    numberPadRef: React.MutableRefObject<TextInput>;
    repeatRef: React.MutableRefObject<PickerSelectRef>;
    initialOccurrenceRef: React.MutableRefObject<DatePickerRef>;
}

interface FormValues {
    title: string;
    amount: number;
    repeat: string;
    initialOccurrenceDate: string;
}

const PaymentForm = (props: FormProps & FormikProps<FormValues>) => {
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
                    onSubmit={() => props.repeatRef.current.showPicker()}
                />
                <PickerSelect 
                    preRenderIcon={<Icon name="repeat" />}
                    placeholder="Repeat?"
                    items={Object.keys(RecurrenceLabels)}
                    value={props.values.repeat}
                    onChange={newValue => {
                        props.handleChange("repeat")(newValue);
                        props.initialOccurrenceRef.current.showPicker();
                    }}
                    errorMessage={props.touched.repeat && props.errors.repeat}
                    pickerSelectRef={props.repeatRef}
                    
                />
                <DatePicker
                    preRenderIcon={<Icon name="event" />}
                    placeholder="Initial Occurrence Date"
                    value={props.values.initialOccurrenceDate ? new Date(props.values.initialOccurrenceDate) : undefined}
                    onChange={props.handleChange("initialOccurrenceDate")}
                    errorMessage={props.touched.initialOccurrenceDate && props.errors.initialOccurrenceDate}
                    datePickerRef={props.initialOccurrenceRef}
                />
            </Container>
            <KeyboardAccessory justifyContent="flex-end">
                <Button onPress={props.handleSubmit} text="Save" loading={props.isSubmitting} />
            </KeyboardAccessory>
        </>
    )
}

const PaymentScreen: React.FC = () => {
    const route = useRoute<RouteProps>();
    const navigation = useNavigation();
    const payments = usePayments();
    const numberPadRef = useRef<TextInput>();
    const repeatRef = useRef<PickerSelectRef>();
    const initialOccurrenceRef = useRef<DatePickerRef>();

    const testForValidRepeat = (repeat: string) => (repeat in RecurrenceLabels)
    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
            title: route.params?.payment?.title,
            amount: route.params?.payment?.amount,
            repeat: route.params?.payment?.recurrence && RecurrenceMap[route.params?.payment?.recurrence],
            initialOccurrenceDate: (route.params?.payment ? new Date(route.params.payment.initialYear, route.params.payment.initialMonth, route.params.payment.initialDay).toString() 
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
            const payment: Partial<Payment> = {
                title: values.title,
                amount: Number(values.amount)/100,
                recurrence: RecurrenceLabels[values.repeat],
                initialDay: initialOccurenceDate.getDate(),
                initialMonth: initialOccurenceDate.getMonth(),
                initialYear: initialOccurenceDate.getFullYear()
            }
            if(route.params?.payment?.id) {
                const updated = await payments.update(route.params?.payment?.id, payment);
                if(updated)
                    navigation.goBack();
            }
            else {
                const created = await payments.create(payment);
                if(created)
                    navigation.goBack();
            }
        }
    })(PaymentForm);

    return (
        <Page>
        <Form
            label={route.params && route.params.payment ? "Update Payment" : "Create Payment"}
            numberPadRef={numberPadRef}
            repeatRef={repeatRef}
            initialOccurrenceRef={initialOccurrenceRef}
        />
        </Page>
    )
}

export default PaymentScreen;