import React from "react";
import { 
    Button, 
    Container, 
    Icon, 
    KeyboardAccessory, 
    Label, 
    Page,
    TextField
} from "components";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

interface FormProps {

}

interface FormValues {
    name: string;
}

const PaymentForm = (props: FormProps & FormikProps<FormValues>) => {
    return (
        <>
            <Container allowScroll flex>
                <Label style={{ marginBottom: 25 }} type="header" text="Create Payment" />
                <TextField
                    preRenderIcon={<Icon name="title" />}
                    errorMessage={props.touched.name && props.errors.name}
                    onChange={props.handleChange("name")}
                    value={props.values.name}
                    placeholder="Name"
                    autoFocus
                />
            </Container>
            <KeyboardAccessory justifyContent="flex-end">
                <Button onPress={props.handleSubmit} text="Save" />
            </KeyboardAccessory>
        </>
     )
}

const PaymentScreen: React.FC = () => {
    const navigation = useNavigation();

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
            name: ""
        }),
        validationSchema: Yup.object().shape({

        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
        }
    })(PaymentForm);

    return (
        <Page>
            <Form />
        </Page>
    )
}

export default PaymentScreen;