import React, { useRef } from "react";
import {
   Button,
   Container,
   Icon,
   KeyboardAccessory,
   Label,
   Page,
   Spacer,
   TextField,
   TextFieldSecret
} from "components";
import { Text, TextInput, View } from "react-native";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { makeStyles, useAuth } from "context";
import { useNavigation } from "@react-navigation/native";
import RegisterRoutes from "../routes";
import { RegisterRequest } from "services/external/api/models/requests/registerRequest";
import { parsePhoneNumber } from "services/external/phoneNumbers";
import { isValidEmail } from "services/internal/emails";

const useStyles = makeStyles((theme) => ({
   passwordRequirement: {
      flexDirection: "row",
      alignItems: "stretch"
   },
   iconStyles: {
      paddingRight: 10
   },
   invalid: {
      color: theme.palette.red
   },
   valid: {
      color: theme.palette.green
   }
}));

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialCharacters = "!#$%&()*+,-./:;<=>?@_";

interface PasswordRequirements {
   containsMinimumLength: boolean;
   containsUpperCase: boolean;
   containsSpecialCharacters: boolean;
}

interface FormProps {
   lastNameRef: React.MutableRefObject<TextInput | null>;
   emailOrPhoneNumberRef: React.MutableRefObject<TextInput | null>;
   passwordRef: React.MutableRefObject<TextInput | null>;
   confirmPasswordRef: React.MutableRefObject<TextInput | null>;
   checkForPasswordRequirements: () => PasswordRequirements;
}

interface FormValues {
   firstName: string;
   lastName: string;
   emailOrPhoneNumber: string;
   password: string;
   confirmPassword: string;
}

const RegisterForm = (props: FormProps & FormikProps<FormValues>) => {
   const styles = useStyles();
   const passwordRequirements = props.checkForPasswordRequirements();
   return (
      <>
         <Container allowScroll flex title="Create account">
            <Label type="header" text="Create your account" />
            <Spacer />
            <TextField
               preRenderIcon={<Icon name="subject" />}
               errorMessage={
                  props.touched.firstName ? props.errors.firstName : undefined
               }
               onChange={props.handleChange("firstName")}
               value={props.values.firstName}
               placeholder="First Name"
               onSubmit={() =>
                  props.lastNameRef.current && props.lastNameRef.current.focus()
               }
               textContentType="name"
               autoFocus
            />
            <TextField
               preRenderIcon={<Icon name="subject" />}
               errorMessage={
                  props.touched.lastName ? props.errors.lastName : undefined
               }
               onChange={props.handleChange("lastName")}
               value={props.values.lastName}
               placeholder="Last Name"
               onSubmit={() =>
                  props.emailOrPhoneNumberRef.current &&
                  props.emailOrPhoneNumberRef.current.focus()
               }
               textContentType="name"
               ref={props.lastNameRef}
            />
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
               onSubmit={() =>
                  props.passwordRef.current && props.passwordRef.current.focus()
               }
               autoCapitalize="none"
               ref={props.emailOrPhoneNumberRef}
            />
            <TextFieldSecret
               placeholder="Enter your password"
               errorMessage={
                  props.touched.password ? props.errors.password : undefined
               }
               onChange={props.handleChange("password")}
               onSubmit={() =>
                  props.confirmPasswordRef.current &&
                  props.confirmPasswordRef.current.focus()
               }
               ref={props.passwordRef}
               newPassword
            />
            <TextFieldSecret
               placeholder="Confirm your password"
               errorMessage={
                  props.touched.confirmPassword
                     ? props.errors.confirmPassword
                     : undefined
               }
               onChange={props.handleChange("confirmPassword")}
               onSubmit={() => props.handleSubmit()}
               ref={props.confirmPasswordRef}
            />
            <Spacer />
            <View style={styles.passwordRequirement}>
               {passwordRequirements.containsMinimumLength ? (
                  <Icon
                     name="check-circle"
                     style={[styles.iconStyles, styles.valid]}
                  />
               ) : (
                  <Icon
                     name="error"
                     style={[styles.iconStyles, styles.invalid]}
                  />
               )}
               <Text
                  style={
                     passwordRequirements.containsMinimumLength
                        ? styles.valid
                        : styles.invalid
                  }
               >
                  Have at least 8 characters
               </Text>
            </View>
            <View style={styles.passwordRequirement}>
               {passwordRequirements.containsUpperCase ? (
                  <Icon
                     name="check-circle"
                     style={[styles.iconStyles, styles.valid]}
                  />
               ) : (
                  <Icon
                     name="error"
                     style={[styles.iconStyles, styles.invalid]}
                  />
               )}
               <Text
                  style={
                     passwordRequirements.containsUpperCase
                        ? styles.valid
                        : styles.invalid
                  }
               >
                  Have at least one upper case character
               </Text>
            </View>
            <View style={styles.passwordRequirement}>
               {passwordRequirements.containsSpecialCharacters ? (
                  <Icon
                     name="check-circle"
                     style={[styles.iconStyles, styles.valid]}
                  />
               ) : (
                  <Icon
                     name="error"
                     style={[styles.iconStyles, styles.invalid]}
                  />
               )}
               <Text
                  style={
                     passwordRequirements.containsSpecialCharacters
                        ? styles.valid
                        : styles.invalid
                  }
               >
                  Have at least one special character:{" "}
                  {`\n${specialCharacters}`}
               </Text>
            </View>
         </Container>
         <KeyboardAccessory justifyContent="flex-end">
            <Button
               onPress={props.handleSubmit}
               text="Next"
               loading={props.isSubmitting}
            />
         </KeyboardAccessory>
      </>
   );
};

const RegisterScreen: React.FC = () => {
   const navigation = useNavigation();
   const auth = useAuth();
   const lastNameRef = useRef<TextInput>(null);
   const emailOrPhoneNumberRef = useRef<TextInput>(null);
   const passwordRef = useRef<TextInput>(null);
   const confirmPasswordRef = useRef<TextInput>(null);
   const passwordRequirements = useRef<PasswordRequirements>({
      containsUpperCase: false,
      containsMinimumLength: false,
      containsSpecialCharacters: false
   });

   const testForMinimumRequirements = (value: string): boolean => {
      let hasMinimumLength = false;
      let hasUpperCase = false;
      let hasSpecialCharacters = false;
      if (value && value.length >= 8) hasMinimumLength = true;
      Array.from(upperChars).forEach((c) => {
         if (value && value.includes(c)) hasUpperCase = true;
      });
      Array.from(specialCharacters).forEach((c) => {
         if (value && value.includes(c)) hasSpecialCharacters = true;
      });
      passwordRequirements.current = {
         containsSpecialCharacters: hasSpecialCharacters,
         containsMinimumLength: hasMinimumLength,
         containsUpperCase: hasUpperCase
      };
      return hasMinimumLength && hasUpperCase && hasSpecialCharacters;
   };

   const Form = withFormik<FormProps, FormValues>({
      mapPropsToValues: () => ({
         firstName: "",
         lastName: "",
         emailOrPhoneNumber: "",
         password: "",
         confirmPassword: ""
      }),
      validationSchema: Yup.object().shape({
         firstName: Yup.string().required("First name cannot be blank"),
         lastName: Yup.string().required("Last name cannot be blank"),
         emailOrPhoneNumber: Yup.string().required(
            "Email or phone number cannot be blank"
         ),
         password: Yup.string()
            .required("Password cannot be blank")
            .test(
               "minimumRequirements",
               "Password must meet minimum requirements",
               testForMinimumRequirements as Yup.TestFunction<
                  string | undefined,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  Record<string, any>
               >
            ),
         confirmPassword: Yup.string()
            .required("Confirm your password")
            .oneOf([Yup.ref("password"), null], "Does not match password")
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

         const registerRequest: RegisterRequest = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: values.password
         };
         const response = await auth.register(registerRequest);
         if (!response.valid) {
            formikBag.setErrors({
               emailOrPhoneNumber: response.emailError,
               password: response.passwordError
            });
            return;
         }
         navigation.navigate(RegisterRoutes.ConfirmationCode);
      }
   })(RegisterForm);

   return (
      <Page>
         <Form
            checkForPasswordRequirements={() => passwordRequirements.current}
            lastNameRef={lastNameRef}
            emailOrPhoneNumberRef={emailOrPhoneNumberRef}
            passwordRef={passwordRef}
            confirmPasswordRef={confirmPasswordRef}
         />
      </Page>
   );
};

export default RegisterScreen;
