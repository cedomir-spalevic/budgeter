import React, { useRef } from "react";
import {
   StyleSheet,
   View,
   Text,
   ActivityIndicator
} from "react-native";
import { TextFieldSecret, TextField, Button, FormError } from "components";
import { colors, globalStyles } from "styles";
import { btoa } from "services/internal/security";
import Icon from "components/Icon";
import { useAuth } from "context/Auth";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";

const styles = StyleSheet.create({
   passwordRequirement: {
      flexDirection: "row",
      alignItems: "center"
   },
   iconStyles: {
      paddingRight: 10
   },
   invalid: {
      color: colors.red
   },
   valid: {
      color: colors.green
   }
})

interface FormValues {
   email: string;
   password: string;
   confirmPassword: string;
   formError: string;
}

interface PasswordRequirements {
   containsMinimumLength: boolean;
   containsUpperCase: boolean;
   containsSpecialCharacters: boolean;
}

interface Props {
   checkForPasswordRequirements: () => PasswordRequirements;
}

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialCharacters = "!#$%&()*+,-./:;<=>?@_";

const RegisterForm = (props: Props & FormikProps<FormValues>) => {
   const passwordRequirements = props.checkForPasswordRequirements();
   return (
      <>
         <View style={globalStyles.inputContainer}>
            <TextField
               preRenderIcon={<Icon name="email" />}
               placeholder="Enter your email"
               errorMessage={props.touched.email && props.errors.email}
               onChange={props.handleChange("email")}
            />
         </View>
         <View style={globalStyles.inputContainer}>
             <TextFieldSecret
               placeholder="Enter your password"
               errorMessage={props.touched.password && props.errors.password}
               onChange={props.handleChange("password")}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <TextFieldSecret
               placeholder="Confirm your password"
               errorMessage={props.touched.confirmPassword && props.errors.confirmPassword}
               onChange={props.handleChange("confirmPassword")}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <View style={styles.passwordRequirement}>
               {passwordRequirements.containsMinimumLength ?
                  <Icon name="check-circle" style={[styles.iconStyles, styles.valid]} />
                     : <Icon name="error" style={[styles.iconStyles, styles.invalid]} /> }
               <Text style={passwordRequirements.containsMinimumLength ? styles.valid : styles.invalid}>
                  Have at least 8 characters
               </Text>
            </View>
            <View style={styles.passwordRequirement}>
               {passwordRequirements.containsUpperCase ?
                  <Icon name="check-circle" style={[styles.iconStyles, styles.valid]} />
                     : <Icon name="error" style={[styles.iconStyles, styles.invalid]} /> }
               <Text style={passwordRequirements.containsUpperCase ? styles.valid : styles.invalid}>
                  Have at least one upper case character
                  </Text>
            </View>
            <View style={styles.passwordRequirement}>
               {passwordRequirements.containsSpecialCharacters ?
                  <Icon name="check-circle" style={[styles.iconStyles, styles.valid]} />
                     : <Icon name="error" style={[styles.iconStyles, styles.invalid]} /> }
               <Text style={passwordRequirements.containsSpecialCharacters ? styles.valid : styles.invalid}>
                  Have at least one special character: {specialCharacters}
               </Text>
            </View>
         </View>
         <View style={globalStyles.inputContainer}>
            <Button
               onPress={props.handleSubmit}
               children={props.isSubmitting ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
               text={props.isSubmitting ? undefined : "Create Account"}
            />
         </View>
         <FormError
            visible={Boolean(props.errors.formError)}
            message={props.errors.formError}
         />
      </>
   )
}

const Register: React.FC = () => {
   const auth = useAuth();
   const passwordRequirements = useRef<PasswordRequirements>({ 
      containsUpperCase: false, 
      containsMinimumLength: false, 
      containsSpecialCharacters: false
   });

   const testForMinimumRequirements = (value: string): boolean => {
      let hasMinimumLength = false, hasUpperCase = false, hasSpecialCharacters = false;
      if(value && value.length >= 8)
         hasMinimumLength = true;
      Array.from(upperChars).forEach(c => {
         if (value && value.includes(c)) hasUpperCase = true;
      });
      Array.from(specialCharacters).forEach(c => {
         if (value && value.includes(c)) hasSpecialCharacters = true;
      });
      passwordRequirements.current = {
         containsSpecialCharacters: hasSpecialCharacters,
         containsMinimumLength: hasMinimumLength,
         containsUpperCase: hasUpperCase
      }
      return hasMinimumLength && hasUpperCase && hasSpecialCharacters;
   }

   const Form = withFormik<Props, FormValues>({
      mapPropsToValues: (props: Props) => ({
         email: "",
         password: "",
         confirmPassword: "",
         formError: ""
      }),
      validationSchema: Yup.object().shape({
         email: Yup.string().email("Not a valid email").required("Email cannot be blank"),
         password: Yup.string().required("Password cannot be blank")
            .test("minimumRequirements", "Password must meet minimum requirements", testForMinimumRequirements),
         confirmPassword: Yup.string().required("Confirm your password")
            .oneOf([Yup.ref("password"), null], "Does not match password")
      }),
      handleSubmit: async (values: FormValues, formikBag: FormikBag<Props, FormValues>)  => {
         const response = await auth.signup(values.email, values.password);
         if(response) {
            formikBag.setErrors({
               email: response.emailError,
               password: response.passwordError,
               formError: response.formError
            })
         }
      }
   })(RegisterForm);

   return <Form checkForPasswordRequirements={() => passwordRequirements.current} />
}

export default Register;