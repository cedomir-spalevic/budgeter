import React, { useEffect } from "react";
import { 
    Button, 
    Container, 
    Icon, 
    KeyboardAccessory, 
    Label, 
    Page,
    TextField,
    Spacer
} from "components";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "context";
import { useNavigation } from "@react-navigation/native";

interface FormProps {

}

interface FormValues {
    email: string;
}

const ForgotPasswordForm = (props: FormProps & FormikProps<FormValues>) => {
    return (
        <>
            <Container allowScroll flex>
                <Label type="header" text="Enter your email" />
                <Spacer />
                <TextField
                    preRenderIcon={<Icon name="email" />}
                    errorMessage={props.touched.email && props.errors.email}
                    onChange={props.handleChange("email")}
                    value={props.values.email}
                    placeholder="Email"
                    autoFocus
                    onSubmit={() => props.submitForm()}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </Container>
            <KeyboardAccessory justifyContent="flex-end">
                <Button onPress={props.handleSubmit} text="Reset Password" />
            </KeyboardAccessory>
        </>
     )
}

const ForgotPasswordScreen: React.FC = () => {
    const auth = useAuth();
    const navigation = useNavigation();

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
            email: ""
        }),
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Email cannot be blank")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {

        }
     })(ForgotPasswordForm);

    useEffect(() => {
        navigation.goBack()
        navigation.setOptions({
            headerTitle: () => <Label type="header" text="Forgot Password" />
        })
    })

    return (
        <Page>
            <Form />
        </Page>
    )
}

export default ForgotPasswordScreen;