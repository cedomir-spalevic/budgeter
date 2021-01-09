import React, { useEffect } from "react";
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
} from "components";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "context";
import { useNavigation } from "@react-navigation/native";

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
    const navigation = useNavigation();

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

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <Label type="header" text="Forgot Password" />
        })
    })

    return (
        <Page>
            {/* <Container>
                <Label style={{ marginBottom: 25 }} type="header" text="Log in" />
            </Container> */}
            <Form />
        </Page>
    )
}

export default LoginScreen;