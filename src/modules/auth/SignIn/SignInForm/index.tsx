import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
   View,
   ActivityIndicator,
   TouchableOpacity,
   Text,
   StyleSheet
} from "react-native";
import { colors, globalStyles } from "styles";
import {
   TextField,
   TextFieldSecret,
   Button, FormError
} from "components";
import { AuthRoutes } from "modules/auth/routes";
import { btoa } from "services/internal/security";
import Icon from "components/Icon";
import { useAuth } from "context/Auth";

const styles = StyleSheet.create({
   textStyles: {
      fontSize: 16
   },
   linkStyles: {
      color: colors.blue,
      paddingLeft: 3
   },
   registerContainer: {
      flexDirection: "row",
      justifyContent: "center"
   }
})

const SignInForm: React.FC = () => {
   const navigation = useNavigation();
   const auth = useAuth();
   const [email, setEmail] = useState<string>();
   const [emailError, setEmailError] = useState<string>();
   const [password, setPassword] = useState<string>();
   const [passwordError, setPasswordError] = useState<string>();
   const [formError, setFormError] = useState<string>();
   const [sendingRequest, setSendingRequest] = useState<boolean>(false);
   const [submit, setSubmit] = useState<boolean>(false);

   const validateEmail = (value) => {
      let error = undefined;
      if (value === undefined || value.length === 0)
         error = "Email cannot be blank";
      setEmailError(error);
   }

   const onEmailChange = (newValue) => {
      setEmail(newValue);
      validateEmail(newValue);
   }

   const validatePassword = (value) => {
      let error = undefined;
      if (value === undefined || value.length === 0)
         error = "Password cannot be blank";
      setPasswordError(error);
   }

   const onPasswordChange = (newValue) => {
      setPassword(newValue);
      validatePassword(newValue);
   }

   const signin = async () => {
      validateEmail(email);
      validatePassword(password);
      setSubmit(true);
   }

   const submitForm = async () => {
      setSendingRequest(true);
      const response = await auth.signin(email, btoa(password));
      if (response === undefined) {
         setFormError("Unable to sign in");
         setSendingRequest(false);
         setSubmit(false);
      }
      else if (!response.valid) {
         setEmailError(response.emailError);
         setPasswordError(response.passwordError);
         setSendingRequest(false);
         setSubmit(false);
      }
   }

   useEffect(() => {
      if (!submit)
         return;
      if (emailError || passwordError) {
         setSubmit(false);
         return;
      }
      submitForm();
   }, [submit])

   return (
      <React.Fragment>
         <View style={globalStyles.inputContainer}>
            <TextField
               preRenderIcon={<Icon name="email" />}
               placeholder="Enter your email"
               errorMessage={emailError}
               onChange={nt => onEmailChange(nt)}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <TextFieldSecret
               placeholder="Enter your password"
               errorMessage={passwordError}
               onChange={nt => onPasswordChange(nt)}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <Button
               onPress={() => signin()}
               children={sendingRequest ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
               text={sendingRequest ? undefined : "Sign in"}
            />
         </View>
         <FormError
            visible={formError !== undefined}
            message={formError}
         />
         <View style={[globalStyles.inputContainer, styles.registerContainer]}>
            <Text style={styles.textStyles}>
               Don't have an account?
               </Text>
            <TouchableOpacity onPress={() => navigation.navigate(AuthRoutes.Register)}>
               <Text style={[styles.linkStyles, styles.textStyles]}>
                  Register here
               </Text>
            </TouchableOpacity>
         </View>
      </React.Fragment>
   )
}

export default SignInForm;