import React, { useEffect } from "react";
import AuthNavigator from "modules/auth";
import AppNavigator from "modules/app";
import { AuthState, useAuth } from "context/Auth";

const Entry: React.FC = () => {
    const auth = useAuth();

    switch(auth.authState) {
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