import React, { useRef } from "react";
import { 
    Button, 
    Container, 
    Icon, 
    KeyboardAccessory, 
    Label, 
    Page,
    TextField,
    Link,
    TextFieldSecret,
    Spacer
} from "components";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "context";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "../routes";
import { TextInput } from "react-native";

interface FormProps {
    onForgotPasswordClick: () => void;
    passwordRef: React.MutableRefObject<TextInput>;
}

interface FormValues {
    email: string;
    password: string;
}

const LoginForm = (props: FormProps & FormikProps<FormValues>) => {
    return (
        <>
            <Container allowScroll flex>
                <Label type="header" text="Log in" />
                <Spacer />
                <TextField
                    preRenderIcon={<Icon name="email" />}
                    errorMessage={props.touched.email && props.errors.email}
                    onChange={props.handleChange("email")}
                    value={props.values.email}
                    placeholder="Email"
                    autoFocus
                    onSubmit={() => !props.values.email ? props.handleChange("email") : props.passwordRef.current.focus()}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextFieldSecret
                    placeholder="Enter your password"
                    errorMessage={props.touched.password && props.errors.password}
                    onChange={props.handleChange("password")}
                    ref={props.passwordRef}
                    onSubmit={() => props.submitForm()}
                />
            </Container>
            <KeyboardAccessory justifyContent="space-between">
                <Link onPress={() => props.onForgotPasswordClick()} text="Forgot password?" />
                <Button onPress={props.handleSubmit} text="Log in" loading={props.isSubmitting} />
            </KeyboardAccessory>
        </>
     )
}

const LoginScreen: React.FC = () => {
    const auth = useAuth();
    const navigation = useNavigation();
    const passwordRef = useRef<TextInput>();

    const onEmailConfirmation = async (code: number) => {
        const response = await auth.confirmEmailVerification(code);
        return response;
    }

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
           email: "",
           password: ""
        }),
        validationSchema: Yup.object().shape({
            email: Yup.string().required("Email cannot be blank"),
            password: Yup.string().required("Password cannot be blank")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
            const response = await auth.login(values.email, values.password);
            if(!response.valid) {
                if(response.emailNotVerified) {
                    navigation.navigate(AuthRoutes.ConfirmationCode, { 
                        onSubmit: onEmailConfirmation,
                        message: "Please enter the confirmation code that was sent to your email address"
                    });
                }
                formikBag.setErrors({
                    email: response.emailError,
                    password: response.passwordError
                })
            }
        }
     })(LoginForm);

    return (
        <Page>
            <Form 
                onForgotPasswordClick={() => navigation.navigate(AuthRoutes.ForgotPassword)}
                passwordRef={passwordRef}
            />
        </Page>
    )
}

export default LoginScreen;