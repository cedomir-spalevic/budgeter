import React, { useContext } from "react";
import { AuthContext, AuthState } from "context/Auth";
import AuthNavigator from "modules/auth";
import AppNavigator from "modules/app";

const Entry: React.FC = () => {
    const authContext = useContext(AuthContext);

    switch(authContext.authState) {
        case AuthState.SignedOut:
            return <AuthNavigator />
        case AuthState.SigningIn:
            return null;
        case AuthState.SignedIn:
            return <AppNavigator />;
        default:
            return null;
    }
}

export default Entry;