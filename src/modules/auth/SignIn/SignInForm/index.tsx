import React, { useEffect, useState } from "react";
import { useLinkProps, useNavigation } from "@react-navigation/native";
import {
   View,
   ActivityIndicator,
   TouchableOpacity,
   Text,
   StyleSheet,
   Image
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
import { AuthState, useAuth } from "context/Auth";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { getItem, StorageKeys } from "services/internal/storage";
const faceIdIcon = require("assets/images/faceid.png");

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

interface FormValues {
   email: string;
   password: string;
   formError: string;
}

interface Props {
   onRegisterClick: () => void;
   onFaceIdClick: () => void;
}

const SignInForm = (props: Props & FormikProps<FormValues>) => {
   return (
      <>
         <View style={globalStyles.inputContainer}>
            <TextField
               preRenderIcon={<Icon name="email" />}
               placeholder="Enter your email"
               errorMessage={props.touched.email && props.errors.email}
               onChange={props.handleChange("email")}
               value={props.values.email}
               postRenderIcon={props.onFaceIdClick && <Image source={faceIdIcon} />}
               onPostRenderIconClick={props.onFaceIdClick}
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
            <Button
               onPress={props.handleSubmit}
               children={props.isSubmitting ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
               text={props.isSubmitting ? undefined : "Sign in"}
            />
         </View>
         <FormError
            visible={Boolean(props.errors.formError)}
            message={props.errors.formError}
         />
         <View style={[globalStyles.inputContainer, styles.registerContainer]}>
            <Text style={styles.textStyles}>
               Don't have an account?
            </Text>
            <TouchableOpacity onPress={props.onRegisterClick}>
               <Text style={[styles.linkStyles, styles.textStyles]}>
                  Register here
               </Text>
            </TouchableOpacity>
         </View>
      </>
   )
}

const SignIn: React.FC = () => {
   const navigation = useNavigation();
   const auth = useAuth();
   const [foundEmail, setFoundEmail] = useState<string>();

   useEffect(() => {
      if(auth.authState === AuthState.Verified) {
         (async () => {
            const email = await getItem(StorageKeys.UserEmail);
            if(email)
               setFoundEmail(email);
         })();
      }
   }, [auth.authState])

   const Form = withFormik<Props, FormValues>({
      mapPropsToValues: (props: Props) => ({
         email: foundEmail ?? "",
         password: "",
         formError: ""
      }),
      validationSchema: Yup.object().shape({
         email: Yup.string().required("Email cannot be blank"),
         password: Yup.string().required("Password cannot be blank")
      }),
      handleSubmit: async (values: FormValues, formikBag: FormikBag<Props, FormValues>)  => {
         const response = await auth.signin(values.email, values.password);
         if(response) {
            formikBag.setErrors({
               email: response.emailError,
               password: response.passwordError,
               formError: response.formError
            })
         }
      }
   })(SignInForm);

   return (
      <Form 
         onRegisterClick={() => navigation.navigate(AuthRoutes.Register)}
         onFaceIdClick={Boolean(foundEmail) && auth.useLocalAuthentication}
      />
   )
}

export default SignIn;

// const SignInForm: React.FC = () => {
//    const navigation = useNavigation();
//    const auth = useAuth();
//    const [email, setEmail] = useState<string>();
//    const [emailError, setEmailError] = useState<string>();
//    const [password, setPassword] = useState<string>();
//    const [passwordError, setPasswordError] = useState<string>();
//    const [formError, setFormError] = useState<string>();
//    const [sendingRequest, setSendingRequest] = useState<boolean>(false);
//    const [submit, setSubmit] = useState<boolean>(false);

//    const validateEmail = (value) => {
//       let error = undefined;
//       if (value === undefined || value.length === 0)
//          error = "Email cannot be blank";
//       setEmailError(error);
//    }

//    const onEmailChange = (newValue) => {
//       setEmail(newValue);
//       validateEmail(newValue);
//    }

//    const validatePassword = (value) => {
//       let error = undefined;
//       if (value === undefined || value.length === 0)
//          error = "Password cannot be blank";
//       setPasswordError(error);
//    }

//    const onPasswordChange = (newValue) => {
//       setPassword(newValue);
//       validatePassword(newValue);
//    }

//    const signin = async () => {
//       validateEmail(email);
//       validatePassword(password);
//       setSubmit(true);
//    }

//    const submitForm = async () => {
//       setSendingRequest(true);
//       const response = await auth.signin(email, btoa(password));
//       // if (response === undefined) {
//       //    setFormError("Unable to sign in");
//       //    setSendingRequest(false);
//       //    setSubmit(false);
//       // }
//       // else if (!response.valid) {
//       //    setEmailError(response.emailError);
//       //    setPasswordError(response.passwordError);
//       //    setSendingRequest(false);
//       //    setSubmit(false);
//       // }
//    }

//    useEffect(() => {
//       if (!submit)
//          return;
//       if (emailError || passwordError) {
//          setSubmit(false);
//          return;
//       }
//       submitForm();
//    }, [submit])

//    const onSubmit = async (values) => {

//    }

//    const initialValues: 

//    return (
//       <Formik 
//          initialValues={{ email: "" }} 
//          onSubmit={onSubmit}
//          validationSchema={Yup.object().shape({
//             email: Yup.string().email("Must be a valid email").required("Email cannot be blank")
//          })}>
//          {({ handleChange, handleSubmit, values, errors }) => (
//             <>
//                <View style={globalStyles.inputContainer}>
//                   <TextField
//                      preRenderIcon={<Icon name="email" />}
//                      placeholder="Enter your email"
//                      errorMessage={error}
//                      onChange={handleChange("email")}
//                      value={values.email}
//                   />
//                </View>
//                <View style={globalStyles.inputContainer}>
//                   <TextFieldSecret
//                      placeholder="Enter your password"
//                      errorMessage={passwordError}
//                      onChange={nt => onPasswordChange(nt)}
//                   />
//                </View>
//                <View style={globalStyles.inputContainer}>
//                   <Button
//                      onPress={handleSubmit}
//                      children={sendingRequest ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
//                      text={sendingRequest ? undefined : "Sign in"}
//                   />
//                </View>
//                <FormError
//                   visible={formError !== undefined}
//                   message={formError}
//                />
//                <View style={[globalStyles.inputContainer, styles.registerContainer]}>
//                   <Text style={styles.textStyles}>
//                      Don't have an account?
//                      </Text>
//                   <TouchableOpacity onPress={() => navigation.navigate(AuthRoutes.Register)}>
//                      <Text style={[styles.linkStyles, styles.textStyles]}>
//                         Register here
//                      </Text>
//                   </TouchableOpacity>
//                </View>
//             </>
//          )}
//       </Formik>
//       // <React.Fragment>
//       //    <View style={globalStyles.inputContainer}>
//       //       <TextField
//       //          preRenderIcon={<Icon name="email" />}
//       //          placeholder="Enter your email"
//       //          errorMessage={emailError}
//       //          onChange={nt => onEmailChange(nt)}
//       //       />
//       //    </View>
//       //    <View style={globalStyles.inputContainer}>
//       //       <TextFieldSecret
//       //          placeholder="Enter your password"
//       //          errorMessage={passwordError}
//       //          onChange={nt => onPasswordChange(nt)}
//       //       />
//       //    </View>
//       //    <View style={globalStyles.inputContainer}>
//       //       <Button
//       //          onPress={() => signin()}
//       //          children={sendingRequest ? <ActivityIndicator size="small" color={colors.white} /> : undefined}
//       //          text={sendingRequest ? undefined : "Sign in"}
//       //       />
//       //    </View>
//       //    <FormError
//       //       visible={formError !== undefined}
//       //       message={formError}
//       //    />
//       //    <View style={[globalStyles.inputContainer, styles.registerContainer]}>
//       //       <Text style={styles.textStyles}>
//       //          Don't have an account?
//       //          </Text>
//       //       <TouchableOpacity onPress={() => navigation.navigate(AuthRoutes.Register)}>
//       //          <Text style={[styles.linkStyles, styles.textStyles]}>
//       //             Register here
//       //          </Text>
//       //       </TouchableOpacity>
//       //    </View>
//       // </React.Fragment>
//    )
// }

// export default SignInForm;