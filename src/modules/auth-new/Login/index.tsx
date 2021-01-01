import React from "react";
import { 
    Button, 
    Container, 
    Icon, 
    KeyboardAccessory, 
    Label, 
    Page,
    TextField,
    Link,
    TextFieldSecret
} from "components-new";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "context-new";

interface FormProps {

}

interface FormValues {
    email: string;
    password: string;
}

const LoginForm = (props: FormProps & FormikProps<FormValues>) => {
    return (
        <>
            <Container flex>
                <TextField
                    preRenderIcon={<Icon name="email" />}
                    errorMessage={props.touched.email && props.errors.email}
                    onChange={props.handleChange("email")}
                    value={props.values.email}
                    placeholder="Email"
                    autoFocus
                />
                <TextFieldSecret
                    placeholder="Enter your password"
                    errorMessage={props.touched.password && props.errors.password}
                    onChange={props.handleChange("password")}
                />
            </Container>
            <KeyboardAccessory justifyContent="space-between">
                <Link onPress={() => {}} text="Forgot password?" />
                <Button onPress={props.handleSubmit} text="Log in" />
            </KeyboardAccessory>
        </>
     )
}

const LoginScreen: React.FC = () => {
    const auth = useAuth();

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
           email: "",
           password: ""
        }),
        validationSchema: Yup.object().shape({
        //    email: Yup.string().required("Email cannot be blank"),
        //    password: Yup.string().required("Password cannot be blank")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
            await auth.login(values.email, values.password);
        }
     })(LoginForm);

    return (
        <Page modal>
            <Container horizontallyCenter>
                <Label style={{ marginBottom: 25 }} type="header" text="Log in to Budgeter" />
            </Container>
            <Form />
        </Page>
    )
}

export default LoginScreen;