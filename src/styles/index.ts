import { StyleSheet } from "react-native";

export const colors = {
   primary: "#1883c4",
   secondary: "#e0e0e0",
   secondaryDarker: "#ccc",
   black: "#000",
   white: "#fff",
   red: "#bb0000",
   blue: "#1883c4",
   green: "#00ad56",
   darkerBlue: "#6D7787",
   darkBlue: "#B3BBC6"
}

export const globalStyles = StyleSheet.create({
   container: {
      flex: 1,
      paddingLeft: "10%",
      paddingRight: "10%"
   },
   listContainer: {
      flex: 1,
      paddingLeft: "3%",
      paddingRight: "3%"
   },
   verticallyCentered: {
      flex: 1,
      justifyContent: "center"
   },
   centeredScreen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   inputContainer: {
      paddingTop: 20
   },
   textInputContainer: {
      padding: 10,
      backgroundColor: colors.secondary,
      width: "100%",
      height: 40,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      shadowColor: colors.secondaryDarker,
      shadowOffset: { width: 5, height: 5 },
      shadowRadius: 3,
      elevation: 5,
      shadowOpacity: 0.8
   },
   textInputIconStyles: {
      fontSize: 18,
      width: 25,
      color: colors.secondaryDarker,
      resizeMode: "contain"
   },
   textInput: {
      flex: 1,
      fontSize: 16,
      width: "100%",
   },
   errorIcon: {
      paddingLeft: 5,
      fontSize: 18,
      color: colors.red
   },
   errorMessage: {
      color: colors.red,
      paddingLeft: 10,
      paddingTop: 5
   },
   shadow: {
      shadowColor: colors.secondaryDarker,
      shadowOffset: { width: 5, height: 5 },
      shadowRadius: 3,
      elevation: 5,
      shadowOpacity: 0.5
   },
   formError: {
      paddingTop: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
   },
   formErrorText: {
      fontSize: 16,
      color: colors.red
   }
})

export const labelStyles = StyleSheet.create({
   label: {
      fontFamily: "Helvetica Neue"
   },
   header: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.darkerBlue,
   },
   shadow: {
      fontSize: 18,
      color: colors.darkBlue,
      shadowOpacity: 0.2,
      shadowRadius: 2,
      shadowOffset: { width: 2, height: 2 }
   }
})