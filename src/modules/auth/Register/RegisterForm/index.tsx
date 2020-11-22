import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "context/Auth";
import {
   StyleSheet,
   View,
   Text,
   ActivityIndicator
} from "react-native";
import { TextFieldSecret, TextField, Button, FormError } from "components";
import { colors, globalStyles } from "styles";
import { btoa } from "services/utils/security";
import Icon from "components/Icon";

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
      color: colors.primary
   }
})

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialCharacters = "!#$%&()*+,-./:;<=>?@_";

const RegisterForm: React.FC = () => {
   const authContext = useContext(AuthContext);
   const [email, setEmail] = useState<string>();
   const [emailError, setEmailError] = useState<string>();
   const [containsUpperCase, setContainsUpperCase] = useState<boolean>();
   const [containsSpecialCharacters, setContainsSpecialCharacters] = useState<boolean>();
   const [containsMinimumLength, setContainsMinimumLength] = useState<boolean>();
   const [password, setPassword] = useState<string>();
   const [passwordError, setPasswordError] = useState<string>();
   const [reEnteredPassword, setReEnteredPassword] = useState<string>();
   const [reEnteredPasswordError, setReEnteredPasswordError] = useState<string>();
   const [formError, setFormError] = useState<string>();
   const [sendingRequest, setSendingRequest] = useState<boolean>(false);
   const [submit, setSubmit] = useState<boolean>(false);

   const validateEmail = (value: string) => {
      let error = undefined;
      if (value === undefined || value.length === 0)
         error = "Email cannot be blank";
      if (error === undefined && !value.includes("@"))
         error = "Not a valid Email";
      setEmailError(error);
   }

   const onEmailChange = (newValue) => {
      setEmail(newValue);
      validateEmail(newValue);
   }

   const validatePassword = (value) => {
      let hasError = false;
      let hasMinimumLength = false;
      if (value !== undefined && value.length >= 8) {
         hasMinimumLength = true;
         hasError = true;
      }
      setContainsMinimumLength(hasMinimumLength);

      let hasUpperCase = false;
      if (value !== undefined) {
         Array.from(upperChars).forEach(c => {
            if (value.includes(c)) {
               hasUpperCase = true;
               hasError = true;
            }
         });
      }
      setContainsUpperCase(hasUpperCase);

      let hasSpecialCharacters = false;
      if (value !== undefined) {
         Array.from(specialCharacters).forEach(c => {
            if (value.includes(c)) {
               hasSpecialCharacters = true;
               hasError = true;
            }
         });
      }
      setContainsSpecialCharacters(hasSpecialCharacters);
      if (!hasError)
         setPasswordError(undefined);
   }

   const onPasswordChange = (newValue) => {
      setPassword(newValue);
      validatePassword(newValue);
   }

   const validateReEnteredPassword = (value) => {
      let error = undefined;
      if (value !== undefined && value !== password)
         error = "Does not match entered password";
      setReEnteredPasswordError(error);
   }

   const onReEnteredPasswordChange = (newValue) => {
      setReEnteredPassword(newValue);
      validateReEnteredPassword(newValue);
   }

   const signup = async () => {
      validateEmail(email);
      validatePassword(password);
      validateReEnteredPassword(reEnteredPassword);
      setSubmit(true);
   }

   useEffect(() => {
      if (!submit)
         return;
      if (emailError || !containsUpperCase || !containsSpecialCharacters || !containsMinimumLength || reEnteredPasswordError) {
         setSubmit(false);
         return;
      }
      (async () => {
         setSendingRequest(true);
         const response = await authContext.signup(email, btoa(password));
         if (response === undefined) {
            setFormError("Unable to sign up");
            setSendingRequest(false);
            setSubmit(false);
         }
         else if (!response.valid) {
            setEmailError(response.emailError);
            setPasswordError(response.passwordError);
            setSendingRequest(false);
            setSubmit(false);
         }
      })();
   }, [submit])

   const miniminumLengthStyles = (containsMinimumLength ? styles.valid : styles.invalid)
   const upperCaseStyles = (containsUpperCase ? styles.valid : styles.invalid)
   const specialCharactersStyles = (containsSpecialCharacters ? styles.valid : styles.invalid)
   return (
      <React.Fragment>
         <View style={globalStyles.inputContainer}>
            <TextField
               preRenderIcon={<Icon name="email" />}
               placeholder="Enter your email"
               errorMessage={emailError}
               onChange={(nt) => onEmailChange(nt)}
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
            <TextFieldSecret
               placeholder="Re-enter your password"
               errorMessage={reEnteredPasswordError}
               onChange={nt => onReEnteredPasswordChange(nt)}
            />
         </View>
         <View style={globalStyles.inputContainer}>
            <View style={styles.passwordRequirement}>
               {containsMinimumLength ?
                  <Icon name="check_circle" style={[styles.iconStyles, styles.valid]} />
                  : <Icon name="error" style={[styles.iconStyles, styles.invalid]} /> }
               <Text style={miniminumLengthStyles}>
                  Have at least 8 characters
               </Text>
            </View>
            <View style={styles.passwordRequirement}>
               {containsUpperCase ?
                  <Icon name="check_circle" style={[styles.iconStyles, styles.valid]} />
                  : <Icon name="error" style={[styles.iconStyles, styles.invalid]} /> }
               <Text style={upperCaseStyles}>
                  Have at least one upper case character
                  </Text>
            </View>
            <View style={styles.passwordRequirement}>
               {containsSpecialCharacters ?
                  <Icon name="check_circle" style={[styles.iconStyles, styles.valid]} />
                  : <Icon name="error" style={[styles.iconStyles, styles.invalid]} /> }
               <Text style={specialCharactersStyles}>
                  Have at least one special character: {specialCharacters}
               </Text>
            </View>
         </View>
         <View style={globalStyles.inputContainer}>
            <Button
               onPress={() => signup()}
               children={sendingRequest ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
               text={sendingRequest ? undefined : "Create Account"}
            />
         </View>
         <FormError
            visible={formError !== undefined}
            message={formError}
         />
      </React.Fragment>
   )
}

export default RegisterForm;