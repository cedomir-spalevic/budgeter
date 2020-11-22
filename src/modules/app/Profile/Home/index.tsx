import React, { useContext } from "react";
import {
   View,
   Text
} from "react-native";
import { globalStyles } from "styles";
import { AuthContext } from "context/Auth";
import Button from "components/Button";

const ProfileScreen: React.FC = () => {
   const authContext = useContext(AuthContext);
   return (
      <View style={globalStyles.centeredScreen}>
         <Text>Profile Screen</Text>
         <Button
            text="Sign out"
            onPress={() => authContext.signout && authContext.signout()}
         />
      </View>
   )
}

export default ProfileScreen;