import React, { useState, useRef, useEffect } from "react";
import {
    Keyboard,
    Dimensions
} from "react-native";
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
import { useModal } from "context-new";

interface FormProps {

}

interface FormValues {
    email: string;
    password: string;
}

const LoginForm = (props: FormProps & FormikProps<FormValues>) => {
    const [height, setHeight] = useState<number>();
    const [yOffset, setYOffset] = useState<number>();
    const view = useRef(null);

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", e => setHeight(e.startCoordinates.height))
    }, [])

    let h = 0;
    if(yOffset && height) {
        h = (Dimensions.get("screen").height - height);
    }
    const modal = useModal();
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
                <Button onPress={() => {}} text="Log in" />
            </KeyboardAccessory>
        </>
     )
}

const LoginScreen: React.FC = () => {

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