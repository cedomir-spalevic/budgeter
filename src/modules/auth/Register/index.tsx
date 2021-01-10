import React, { useRef } from "react";
import { 
    Button, 
    Container, 
    Icon, 
    KeyboardAccessory, 
    Label, 
    Page,
    TextField,
    TextFieldSecret
} from "components";
import { Text, TextInput, View } from "react-native";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { colors } from "styles";
import { makeStyles, useAuth } from "context";
import { useNavigation } from "@react-navigation/native";
import { AuthRoutes } from "../routes";

const useStyles = makeStyles(palette => ({
    passwordRequirement: {
       flexDirection: "row",
       alignItems: "stretch"
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
}))

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const specialCharacters = "!#$%&()*+,-./:;<=>?@_";

interface PasswordRequirements {
    containsMinimumLength: boolean;
    containsUpperCase: boolean;
    containsSpecialCharacters: boolean;
 }

interface FormProps {
    lastNameRef?: React.MutableRefObject<TextInput>;
    emailRef?: React.MutableRefObject<TextInput>;
    passwordRef?: React.MutableRefObject<TextInput>;
    confirmPasswordRef?: React.MutableRefObject<TextInput>;
    checkForPasswordRequirements: () => PasswordRequirements;
}

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = (props: FormProps & FormikProps<FormValues>) => {
    const styles = useStyles();
    const passwordRequirements = props.checkForPasswordRequirements();
    return (
        <>
            <Container allowScroll flex>
                <Label style={{ marginBottom: 25 }} type="header" text="Create your account" />
                <TextField
                    preRenderIcon={<Icon name="subject" />}
                    errorMessage={props.touched.firstName && props.errors.firstName}
                    onChange={props.handleChange("firstName")}
                    value={props.values.firstName}
                    placeholder="First Name"
                    onSubmit={() => props.lastNameRef.current.focus()}
                    autoFocus
                />
                <TextField
                    preRenderIcon={<Icon name="subject" />}
                    errorMessage={props.touched.lastName && props.errors.lastName}
                    onChange={props.handleChange("lastName")}
                    value={props.values.lastName}
                    placeholder="Last Name"
                    onSubmit={() => props.emailRef.current.focus()}
                    ref={props.lastNameRef}
                />
                <TextField
                    preRenderIcon={<Icon name="email" />}
                    errorMessage={props.touched.email && props.errors.email}
                    onChange={props.handleChange("email")}
                    value={props.values.email}
                    placeholder="Email"
                    onSubmit={() => props.passwordRef.current.focus()}
                    ref={props.emailRef}
                />
                <TextFieldSecret
                    placeholder="Enter your password"
                    errorMessage={props.touched.password && props.errors.password}
                    onChange={props.handleChange("password")}
                    onSubmit={() => props.confirmPasswordRef.current.focus()}
                    ref={props.passwordRef}
                />
                <TextFieldSecret
                    placeholder="Confirm your password"
                    errorMessage={props.touched.confirmPassword && props.errors.confirmPassword}
                    onChange={props.handleChange("confirmPassword")}
                    onSubmit={() => props.handleSubmit()}
                    ref={props.confirmPasswordRef}
                />
                <View style={{ height: 10 }}></View>
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
                        Have at least one special character: {`\n${specialCharacters}`}
                    </Text>
                </View>
            </Container>
            <KeyboardAccessory justifyContent="flex-end">
                <Button onPress={props.handleSubmit} text="Next" loading={props.isSubmitting} />
            </KeyboardAccessory>
        </>
     )
}

const RegisterScreen: React.FC = () => {
    const navigation = useNavigation();
    const auth = useAuth();
    const lastNameRef = useRef<TextInput>();
    const emailRef = useRef<TextInput>();
    const passwordRef = useRef<TextInput>();
    const confirmPasswordRef = useRef<TextInput>();
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

    const Form = withFormik<FormProps, FormValues>({
        mapPropsToValues: (props: FormProps) => ({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }),
        validationSchema: Yup.object().shape({
            firstName: Yup.string().required("First name cannot be blank"),
            lastName: Yup.string().required("Last name cannot be blank"),
            email: Yup.string().email("Not a valid email").required("Email cannot be blank"),
            password: Yup.string().required("Password cannot be blank")
               .test("minimumRequirements", "Password must meet minimum requirements", testForMinimumRequirements),
            confirmPassword: Yup.string().required("Confirm your password")
               .oneOf([Yup.ref("password"), null], "Does not match password")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
            const response = await auth.register(values.firstName, values.lastName, values.email, values.password);
            if(!response.valid) {
                formikBag.setErrors({
                    email: response.emailError,
                    password: response.passwordError
                });
                return;
            }
            navigation.navigate(AuthRoutes.ConfirmationCode);
        }
     })(RegisterForm);

    return (
        <Page>
            <Form 
                checkForPasswordRequirements={() => passwordRequirements.current}
                lastNameRef={lastNameRef}
                emailRef={emailRef}
                passwordRef={passwordRef}
                confirmPasswordRef={confirmPasswordRef}
            />
    </Page>
    )
}

export default RegisterScreen;