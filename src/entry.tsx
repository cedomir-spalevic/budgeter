<<<<<<< HEAD
import React, { useEffect } from "react";
import AuthNavigator from "modules/auth";
import AppNavigator from "modules/app";
import { AuthState, useAuth } from "context/Auth";
=======
import React from "react";
import AuthNavigator from "modules/auth";
import AppNavigator from "modules/app";
import { AuthState, useAuth } from "context/Auth/context";
>>>>>>> 642410ae8d16e7c8e15ddad31d785a746db0a912

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