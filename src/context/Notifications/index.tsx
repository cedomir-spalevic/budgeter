import { useUser } from "context";
import React, { createContext, useContext } from "react";
import { Notification, Notifications, Registered, RegistrationError } from "react-native-notifications";

interface Props {
   children: React.ReactNode;
}

interface Context {
    askForPermissions: () => Promise<unknown>;
}

const NotificationsContext = createContext<Context>(undefined!);

const NotificationsProvider: React.FC<Props & any> = (props: Props) => {
    const user = useUser();

    const askForPermissions = () => {
        return new Promise((resolve, reject) => {
            Notifications.registerRemoteNotifications();
    
            Notifications.events().registerRemoteNotificationsRegistered(async (event: Registered) => {
                try {
                    await user.registerDevice(event.deviceToken);
                    resolve();
                }
                catch(error) {
                    reject();
                }
            })
            
            Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
                reject();
            })
        })
    }

    return (
        <NotificationsContext.Provider value={{ askForPermissions }}>
            {props.children}
        </NotificationsContext.Provider>
    )
};

export const useNotifications = (): Context => useContext<Context>(NotificationsContext);

export default NotificationsProvider;