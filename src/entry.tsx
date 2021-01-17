import React from "react";
import AuthNavigator from "modules/auth";
import AppLoader from "modules/app";
import { 
    AuthState, 
    useAuth, 
    PaymentsProvider, 
    IncomesProvider
} from "context";
import UserProvider from "context/User";

const Entry: React.FC = () => {
    const auth = useAuth();
    
    if(auth.state !== AuthState.SignedIn)
        return <AuthNavigator />;
    return (
        <UserProvider>
            <IncomesProvider>
                <PaymentsProvider>
                        <AppLoader />
                </PaymentsProvider>
            </IncomesProvider>
        </UserProvider>
    )
}
export default Entry;