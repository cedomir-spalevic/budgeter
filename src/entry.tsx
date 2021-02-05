import React from "react";
import AuthNavigator from "modules/auth";
import AppLoader from "modules/app";
import { 
    AuthState, 
    useAuth, 
    PaymentsProvider, 
    IncomesProvider,
    UserProvider,
    BudgetsProvider
} from "context";

const Entry: React.FC = () => {
    const auth = useAuth();
    
    switch(auth.state) {
        case AuthState.SignedIn:
            return (
                <UserProvider>
                    <BudgetsProvider>
                        <IncomesProvider>
                            <PaymentsProvider>
                                <AppLoader />
                            </PaymentsProvider>
                        </IncomesProvider>
                    </BudgetsProvider>
                </UserProvider>
            )
        default: 
            return <AuthNavigator />
    }
}
export default Entry;