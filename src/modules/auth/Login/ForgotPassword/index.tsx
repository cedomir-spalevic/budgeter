import React, { useRef } from "react";
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
import { LoginRoutes } from "../routes";

interface FormProps {
    allowConfirmation: () => boolean;
    goToConfirmationPage: () => void;
}

interface FormValues {
    email: string;
}

const ForgotPasswordForm = (props: FormProps & FormikProps<FormValues>) => {

    const onResetClick = () => {
        if(props.allowConfirmation())
            props.goToConfirmationPage();
        else
            props.handleSubmit();
    }

    return (
        <>
            <Container allowScroll flex title="Forgot Password">
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
                <Button 
                    onPress={() => onResetClick()} 
                    text={!props.allowConfirmation() ? "Reset Password" : "I received my code"} 
                    loading={props.isSubmitting}
                />
            </KeyboardAccessory>
        </>
     )
}

const ForgotPasswordScreen: React.FC = () => {
    const auth = useAuth();
    const navigation = useNavigation();
    const allowConfirmation = useRef<boolean>(false);

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
            email: ""
        }),
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Email cannot be blank")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
            const response = await auth.forgotPassword(values.email);
            if(response) 
                allowConfirmation.current = true;
        }
    })(ForgotPasswordForm);

    return (
        <Page>
            <Form 
                allowConfirmation={() => allowConfirmation.current}
                goToConfirmationPage={() => navigation.navigate(LoginRoutes.ConfirmationCode)}
            />
        </Page>
    )
}

export default ForgotPasswordScreen;