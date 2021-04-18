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
import { TextInput } from "react-native";
import LoginRoutes from "../routes";
import { LoginRequest } from "services/external/api/models/requests/loginRequest";

interface FormProps {
   onForgotPasswordClick: () => void;
   passwordRef: React.MutableRefObject<TextInput | null>;
}

interface FormValues {
   email: string;
   password: string;
}

const LoginForm = (props: FormProps & FormikProps<FormValues>) => (
   <>
      <Container allowScroll flex title="Log in">
         <Label type="header" text="Log in" />
         <Spacer />
         <TextField
            preRenderIcon={<Icon name="email" />}
            errorMessage={props.touched.email ? props.errors.email : undefined}
            onChange={props.handleChange("email")}
            value={props.values.email}
            placeholder="Email"
            autoFocus
            onSubmit={() =>
               !props.values.email
                  ? props.handleChange("email")
                  : props.passwordRef.current &&
                    props.passwordRef.current.focus()
            }
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
         />
         <TextFieldSecret
            placeholder="Enter your password"
            errorMessage={
               props.touched.password ? props.errors.password : undefined
            }
            onChange={props.handleChange("password")}
            ref={props.passwordRef}
            onSubmit={() => props.submitForm()}
         />
      </Container>
      <KeyboardAccessory justifyContent="space-between">
         <Link
            onPress={() => props.onForgotPasswordClick()}
            text="Forgot password?"
         />
         <Button
            onPress={props.handleSubmit}
            text="Log in"
            loading={props.isSubmitting}
         />
      </KeyboardAccessory>
   </>
);

const LoginScreen: React.FC = () => {
   const auth = useAuth();
   const navigation = useNavigation();
   const passwordRef = useRef<TextInput>(null);

   const Form = withFormik<FormProps, FormValues>({
      mapPropsToValues: () => ({
         email: "",
         password: ""
      }),
      validationSchema: Yup.object().shape({
         email: Yup.string().required("Email cannot be blank"),
         password: Yup.string().required("Password cannot be blank")
      }),
      handleSubmit: async (
         values: FormValues,
         formikBag: FormikBag<FormProps, FormValues>
      ) => {
         const loginRequest: LoginRequest = {
            email: values.email,
            password: values.password
         };
         const response = await auth.login(loginRequest);
         if (!response.valid) {
            if (response.verificationEmailSent === true) {
               navigation.navigate(LoginRoutes.ConfirmationCode);
               return;
            }
            formikBag.setErrors({
               email: response.emailError,
               password: response.passwordError
            });
         }
      }
   })(LoginForm);

   return (
      <Page>
         <Form
            onForgotPasswordClick={() =>
               navigation.navigate(LoginRoutes.ForgotPassword)
            }
            passwordRef={passwordRef}
         />
      </Page>
   );
};

export default LoginScreen;
