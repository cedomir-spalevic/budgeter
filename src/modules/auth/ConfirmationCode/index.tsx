import React from "react";
import { 
    Button, 
    Container, 
    KeyboardAccessory, 
    Label, 
    Page,
    ConfirmationCodeInput
} from "components";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "context";

interface FormProps {
}

interface FormValues {
    code: number
}

const ConfirmationCodeForm = (props: FormProps & FormikProps<FormValues>) => {
    return (
        <>
            <Container allowScroll flex>
                <Label style={{ marginBottom: 25 }} type="header" text="Enter confirmation code" />
                <ConfirmationCodeInput 
                    onSubmit={code => props.setFieldValue("code", code)}
                />
            </Container>
            <KeyboardAccessory justifyContent="flex-end">
                <Button onPress={props.handleSubmit} text="Confirm" loading={props.isSubmitting} />
            </KeyboardAccessory>
        </>
     )
}

const ConfirmationCodeScreen: React.FC = () => {
    const auth = useAuth();

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
           code: undefined
        }),
        validationSchema: Yup.object().shape({
            code: Yup.number().required("Enter the confirmation code sent to your email")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
            console.log(values);
        }
     })(ConfirmationCodeForm);

    return (
        <Page>
            <Form />
        </Page>
    )
}

export default ConfirmationCodeScreen;