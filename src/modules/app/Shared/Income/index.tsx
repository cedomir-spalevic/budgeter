import React from "react";
import { 
    Button, 
    Container, 
    Icon, 
    KeyboardAccessory, 
    Label, 
    Page,
    TextField,
    NumberPad
} from "components";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "context";

interface FormProps {

}

interface FormValues {
    name: string;
}

const IncomeForm = (props: FormProps & FormikProps<FormValues>) => {
    return (
        <>
            <Container flex>
                <TextField
                    preRenderIcon={<Icon name="title" />}
                    errorMessage={props.touched.name && props.errors.name}
                    onChange={props.handleChange("name")}
                    value={props.values.name}
                    placeholder="Name"
                    autoFocus
                />
                <NumberPad
                    preRenderIcon={<Icon name="attach-money" />}
                    placeholder="Amount"
                />
            </Container>
            <KeyboardAccessory justifyContent="flex-end">
                <Button onPress={props.handleSubmit} text="Save" />
            </KeyboardAccessory>
        </>
     )
}

const IncomeScreen: React.FC = () => {
    const auth = useAuth();

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
            name: ""
        }),
        validationSchema: Yup.object().shape({
        //    email: Yup.string().required("Email cannot be blank"),
        //    password: Yup.string().required("Password cannot be blank")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
        }
     })(IncomeForm);

    return (
        <Page useHeaderHeight>
            <Container horizontallyCenter>
                <Label style={{ marginBottom: 25 }} type="header" text="Create Income" />
            </Container>
            <Form />
        </Page>
    )
}

export default IncomeScreen;