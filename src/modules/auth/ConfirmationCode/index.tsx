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
import { RouteProp, useRoute } from "@react-navigation/native";

export interface ConfirmationCodeParams {
    message?: string;
    onSubmit: (code: number) => Promise<boolean>;
}

type ParamList = {
    "ConfirmationCode": ConfirmationCodeParams
}

type RouteProps = RouteProp<ParamList, "ConfirmationCode">;

interface FormProps {
    message?: string;
}

interface FormValues {
    code: number
}

const ConfirmationCodeForm = (props: FormProps & FormikProps<FormValues>) => {
    return (
        <>
            <Container allowScroll flex>
                <Label style={{ marginBottom: 25 }} type="header" text="Enter confirmation code" />
                {props.message && 
                    <Label style={{ marginBottom: 25 }} type="regular" text={props.message} />}
                <ConfirmationCodeInput
                    onChange={code => props.setFieldValue("code", code, true)}
                    onSubmit={() => props.handleSubmit()}
                />
            </Container>
            <KeyboardAccessory justifyContent="flex-end">
                <Button onPress={props.handleSubmit} text="Confirm" loading={props.isSubmitting} />
            </KeyboardAccessory>
        </>
     )
}

const ConfirmationCodeScreen: React.FC = () => {
    const route = useRoute<RouteProps>();

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
           code: undefined
        }),
        validationSchema: Yup.object().shape({
            code: Yup.number().required("Enter the confirmation code sent to your email")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
            if(route.params) {
                const confirmed = await route.params.onSubmit(values.code);
                console.log(confirmed)
                if(!confirmed) {
                    // TODO: Set error message
                }
            }
        }
     })(ConfirmationCodeForm);

    return (
        <Page>
            <Form message={route.params?.message} />
        </Page>
    )
}

export default ConfirmationCodeScreen;