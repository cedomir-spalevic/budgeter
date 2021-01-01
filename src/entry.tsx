import React from "react";
import AuthNavigator from "modules/auth-new";
import AppLoader from "modules/app-new";
import { AuthState, useAuth } from "context-new";
import BudgetsProvider from "context/Budgets";
import PaymentsProvider from "context/Payments";
import NotificationsProvider from "context/Notifications";

const Entry: React.FC = () => {
    const auth = useAuth();

    if(auth.state !== AuthState.SignedIn)
        return <AuthNavigator />;
    return (
        <BudgetsProvider>
            <PaymentsProvider>
                <NotificationsProvider>
                    <AppLoader />
                </NotificationsProvider>
            </PaymentsProvider>
        </BudgetsProvider>
    )
}
export default Entry;