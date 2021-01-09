import React from "react";
import AuthNavigator from "modules/auth";
import AppLoader from "modules/app";
import { 
    AuthState, 
    useAuth, 
    PaymentsProvider, 
    IncomesProvider
} from "context";

const Entry: React.FC = () => {
    const auth = useAuth();
    
    if(auth.state !== AuthState.SignedIn)
        return <AuthNavigator />;
    return (
        <IncomesProvider>
            <PaymentsProvider>
                    <AppLoader />
            </PaymentsProvider>
        </IncomesProvider>
    )
}
export default Entry;