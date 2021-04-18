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
import LoginRoutes from "../routes";
import { parsePhoneNumber } from "services/external/phoneNumbers";
import { isValidEmail } from "services/internal/emails";

interface FormProps {
   allowConfirmation: () => boolean;
   goToConfirmationPage: () => void;
}

interface FormValues {
   emailOrPhoneNumber: string;
}

const ForgotPasswordForm = (props: FormProps & FormikProps<FormValues>) => {
   const onResetClick = () => {
      if (props.allowConfirmation()) props.goToConfirmationPage();
      else props.handleSubmit();
   };

   return (
      <>
         <Container allowScroll flex title="Forgot Password">
            <Label type="header" text="Find your account" />
            <Spacer />
            <TextField
               preRenderIcon={<Icon name="email" />}
               errorMessage={
                  props.touched.emailOrPhoneNumber ? props.errors.emailOrPhoneNumber : undefined
               }
               onChange={props.handleChange("emailOrPhoneNumber")}
               value={props.values.emailOrPhoneNumber}
               placeholder="Email or Phone Number"
               autoFocus
               onSubmit={() => props.submitForm()}
               autoCapitalize="none"
            />
         </Container>
         <KeyboardAccessory justifyContent="flex-end">
            <Button
               onPress={() => onResetClick()}
               text={
                  !props.allowConfirmation()
                     ? "Reset Password"
                     : "I received my code"
               }
               loading={props.isSubmitting}
            />
         </KeyboardAccessory>
      </>
   );
};

const ForgotPasswordScreen: React.FC = () => {
   const auth = useAuth();
   const navigation = useNavigation();
   const allowConfirmation = useRef<boolean>(false);

   const Form = withFormik<FormProps, FormValues>({
      mapPropsToValues: () => ({
         emailOrPhoneNumber: ""
      }),
      validationSchema: Yup.object().shape({
         emailOrPhoneNumber: Yup.string().required("Email or phone number cannot be blank")
      }),
      handleSubmit: async (values: FormValues, 
         formikBag: FormikBag<FormProps, FormValues>) => {
         let email: string | undefined = undefined;
         let phoneNumber: string | undefined = undefined;
         const parsedPhoneNumber = parsePhoneNumber(values.emailOrPhoneNumber);
         if(parsedPhoneNumber.isValid)
            phoneNumber = parsedPhoneNumber.internationalFormat
         else if(isValidEmail(values.emailOrPhoneNumber)) 
            email = values.emailOrPhoneNumber;
         else {
            formikBag.setErrors({
               emailOrPhoneNumber: "Email or phone number is not valid"
            });
            return;
         }
         const response = await auth.forgotPassword({ email, phoneNumber });
         if (response) allowConfirmation.current = true;
      }
   })(ForgotPasswordForm);

   return (
      <Page>
         <Form
            allowConfirmation={() => allowConfirmation.current}
            goToConfirmationPage={() =>
               navigation.navigate(LoginRoutes.ConfirmationCode)
            }
         />
      </Page>
   );
};

export default ForgotPasswordScreen;
