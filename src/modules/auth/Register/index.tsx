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
import { Text, View } from "react-native";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { colors } from "styles";
import { makeStyles } from "context";

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
    checkForPasswordRequirements: () => PasswordRequirements;
}

interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm = (props: FormProps & FormikProps<FormValues>) => {
    const styles = useStyles();
    const passwordRequirements = props.checkForPasswordRequirements();
    return (
        <>
            <Container flex>
                <TextField
                    preRenderIcon={<Icon name="email" />}
                    errorMessage={props.touched.email && props.errors.email}
                    onChange={props.handleChange("email")}
                    value={props.values.email}
                    placeholder="Email"
                    autoFocus
                />
                <TextFieldSecret
                    placeholder="Enter your password"
                    errorMessage={props.touched.password && props.errors.password}
                    onChange={props.handleChange("password")}
                />
                <TextFieldSecret
                    placeholder="Confirm your password"
                    errorMessage={props.touched.password && props.errors.password}
                    onChange={props.handleChange("password")}
                />
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
                <Button onPress={() => {}} text="Next" />
            </KeyboardAccessory>
        </>
     )
}

const RegisterScreen: React.FC = () => {
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
           email: "",
           password: "",
           confirmPassword: ""
        }),
        validationSchema: Yup.object().shape({
            email: Yup.string().email("Not a valid email").required("Email cannot be blank"),
            password: Yup.string().required("Password cannot be blank")
               .test("minimumRequirements", "Password must meet minimum requirements", testForMinimumRequirements),
            confirmPassword: Yup.string().required("Confirm your password")
               .oneOf([Yup.ref("password"), null], "Does not match password")
        }),
        handleSubmit: async (values: FormValues, formikBag: FormikBag<FormProps, FormValues>)  => {
        }
     })(RegisterForm);

    return (
        <Page useHeaderHeight>
            <Container horizontallyCenter>
                <Label style={{ marginBottom: 25 }} type="header" text="Create your account" />
            </Container>
            <Form 
                checkForPasswordRequirements={() => passwordRequirements.current}
            />
        </Page>
    )
}

export default RegisterScreen;