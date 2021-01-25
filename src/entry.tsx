import React from "react";
import AuthNavigator from "modules/auth";
import AppLoader from "modules/app";
import { 
    AuthState, 
    useAuth, 
    PaymentsProvider, 
    IncomesProvider,
    UserProvider
} from "context";

const Entry: React.FC = () => {
    const auth = useAuth();
    
    switch(auth.state) {
        case AuthState.SignedIn:
            return (
                <UserProvider>
                    <IncomesProvider>
                        <PaymentsProvider>
                            <AppLoader />
                        </PaymentsProvider>
                    </IncomesProvider>
                </UserProvider>
            )
        default: 
            return <AuthNavigator />
    }
}
export default Entry;