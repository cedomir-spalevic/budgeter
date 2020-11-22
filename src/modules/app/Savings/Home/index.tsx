import React, { useContext } from "react";
import {
   View,
   Text
} from "react-native";
import { globalStyles } from "styles";

const SavingsScreen: React.FC = () => {
   return (
      <View style={globalStyles.centeredScreen}>
         <Text>Savings Screen</Text>
      </View>
   )
}

export default SavingsScreen;