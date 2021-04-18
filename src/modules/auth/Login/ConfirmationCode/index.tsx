import React from "react";
import {
   Button,
   Container,
   KeyboardAccessory,
   Label,
   Page,
   ConfirmationCodeInput,
   Icon,
   Spacer
} from "components";
import { View } from "react-native";
import { FormikBag, FormikProps, withFormik } from "formik";
import * as Yup from "yup";
import { makeStyles, useAuth, useTheme } from "context";
import { useNavigation } from "@react-navigation/native";
import LoginRoutes from "../routes";

const useStyles = makeStyles((theme) => ({
   errorView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
   },
   iconStyles: {
      paddingRight: 10,
      fontSize: 24,
      color: theme.palette.red
   }
}));

interface FormProps {
   message: string | null;
}

interface FormValues {
   code?: number;
}

const ConfirmationCodeForm = (props: FormProps & FormikProps<FormValues>) => {
   const styles = useStyles();
   const theme = useTheme();
   return (
      <>
         <Container allowScroll flex title="Confirmation code">
            <Label type="header" text="Enter confirmation code" />
            <Spacer />
            {props.message && (
               <>
                  <Label type="regular" text={props.message} />
                  <Spacer />
               </>
            )}
            <ConfirmationCodeInput
               onChange={(code) => props.setFieldValue("code", code, true)}
               onSubmit={() => props.handleSubmit()}
            />
            {props.touched.code && props.errors.code && (
               <>
                  <Spacer />
                  <View style={styles.errorView}>
                     <Icon name="error" style={styles.iconStyles} />
                     <Label
                        text={props.errors.code}
                        color={theme.value.palette.red}
                        type="regular"
                     />
                  </View>
               </>
            )}
         </Container>
         <KeyboardAccessory justifyContent="flex-end">
            <Button
               onPress={props.handleSubmit}
               text="Confirm"
               loading={props.isSubmitting}
            />
         </KeyboardAccessory>
      </>
   );
};

const ConfirmationCodeScreen: React.FC = () => {
   const auth = useAuth();
   const navigation = useNavigation();

   const Form = withFormik<FormProps, FormValues>({
      mapPropsToValues: () => ({
         code: undefined
      }),
      validationSchema: Yup.object().shape({
         code: Yup.number().required(
            "Enter the confirmation code sent to your email"
         )
      }),
      handleSubmit: async (
         values: FormValues,
         formikBag: FormikBag<FormProps, FormValues>
      ) => {
         const confirmed = await auth.confirmPasswordReset(values.code!);
         if (!confirmed) {
            formikBag.setErrors({
               code: "Incorrect confirmation code"
            });
            return;
         }
         navigation.navigate(LoginRoutes.UpdatePassword);
      }
   })(ConfirmationCodeForm);

   return (
      <Page>
         <Form message={null} />
      </Page>
   );
};

export default ConfirmationCodeScreen;
