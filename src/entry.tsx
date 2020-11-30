import React from "react";
import AuthNavigator from "modules/auth";
import AppNavigator from "modules/app";
import { AuthState, useAuth } from "context/Auth";
import BudgetsProvider from "context/Budgets";
import PaymentsProvider from "context/Payments";
import NotificationsProvider from "context/Notifications";

const Entry: React.FC = () => {
    const auth = useAuth();

    switch(auth.authState) {
        case AuthState.SignedOut:
            return <AuthNavigator />
        case AuthState.SigningIn:
            return null;
        case AuthState.SignedIn:
            return (
                <BudgetsProvider>
                    <PaymentsProvider>
                        <NotificationsProvider>
                            <AppNavigator />
                        </NotificationsProvider>
                    </PaymentsProvider>
                </BudgetsProvider>
            );
        default:
            return null;
    }
}
export default Entry;