import React from "react";
import {
   View,
   Text
} from "react-native";
import { colors, globalStyles } from "styles";
import { MovingForward } from "styles/images";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "components";
<<<<<<< HEAD
import { useAuth } from "context/Auth";
=======
import { useAuth } from "context/Auth/context";
>>>>>>> 642410ae8d16e7c8e15ddad31d785a746db0a912

const ProfileScreen: React.FC = () => {
   const auth = useAuth();
   const navigation = useNavigation();

   navigation.setOptions({
      headerRight: () => (
         <Icon
            name="exit-to-app"
            style={{ paddingRight: 20, color: colors.primary, fontSize: 32 }}
            onPress={() => auth.signout()}
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