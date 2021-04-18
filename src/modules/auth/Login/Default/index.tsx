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
import { isValidEmail } from "services/internal/emails";
import { parsePhoneNumber } from "services/external/phoneNumbers";

interface FormProps {
   onForgotPasswordClick: () => void;
   passwordRef: React.MutableRefObject<TextInput | null>;
}

interface FormValues {
   emailOrPhoneNumber: string;
   password: string;
}

const LoginForm = (props: FormProps & FormikProps<FormValues>) => (
   <>
      <Container allowScroll flex title="Log in">
         <Label type="header" text="Log in" />
         <Spacer />
         <TextField
            preRenderIcon={<Icon name="email" />}
            errorMessage={
               props.touched.emailOrPhoneNumber
                  ? props.errors.emailOrPhoneNumber
                  : undefined
            }
            onChange={props.handleChange("emailOrPhoneNumber")}
            value={props.values.emailOrPhoneNumber}
            placeholder="Email or Phone Number"
            autoFocus
            onSubmit={() =>
               !props.values.emailOrPhoneNumber
                  ? props.handleChange("emailOrPhoneNumber")
                  : props.passwordRef.current &&
                    props.passwordRef.current.focus()
            }
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
         emailOrPhoneNumber: "",
         password: ""
      }),
      validationSchema: Yup.object().shape({
         emailOrPhoneNumber: Yup.string().required(
            "Email or phone number cannot be blank"
         ),
         password: Yup.string().required("Password cannot be blank")
      }),
      handleSubmit: async (
         values: FormValues,
         formikBag: FormikBag<FormProps, FormValues>
      ) => {
         let email: string | undefined = undefined;
         let phoneNumber: string | undefined = undefined;

         if (isValidEmail(values.emailOrPhoneNumber)) {
            email = values.emailOrPhoneNumber;
         }
         if (!email) {
            const parsedPhoneNumber = parsePhoneNumber(
               values.emailOrPhoneNumber
            );
            if (parsedPhoneNumber && parsedPhoneNumber.isValid)
               phoneNumber = parsedPhoneNumber.internationalFormat;
         }
         if (!email && !phoneNumber) {
            formikBag.setErrors({
               emailOrPhoneNumber: "Email or phone number is not valid"
            });
            return;
         }

         const loginRequest: LoginRequest = {
            email,
            phoneNumber,
            password: values.password
         };
         const response = await auth.login(loginRequest);
         if (!response.valid) {
            if (response.verificationEmailSent === true) {
               navigation.navigate(LoginRoutes.ConfirmationCode);
               return;
            }
            formikBag.setErrors({
               emailOrPhoneNumber: response.emailError,
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
