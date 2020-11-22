import React, { useContext } from "react";
import {
   View,
   Text
} from "react-native";
import { colors, globalStyles } from "styles";
import { AuthContext } from "context/Auth";
import Button from "components/Button";
import { MovingForward } from "styles/images";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "components";

const ProfileScreen: React.FC = () => {
   const authContext = useContext(AuthContext);
   const navigation = useNavigation();

   navigation.setOptions({
      headerRight: () => (
         <Icon
            name="exit-to-app"
            style={{ paddingRight: 20, color: colors.primary, fontSize: 32 }}
            onPress={() => authContext.signout && authContext.signout()}
         />
      )
   })
   return (
      <View style={globalStyles.centeredScreen}>
         <Text>This page is a work in progress</Text>
         <MovingForward />
      </View>
   )
}

export default ProfileScreen;