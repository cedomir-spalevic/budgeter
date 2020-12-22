import React, { useEffect, createContext, useContext } from "react";
import { Notification, Notifications, Registered, RegistrationError } from "react-native-notifications";
import UserService from "services/external/api/me";

interface Props {
   children: React.ReactNode;
}

interface Context {
}

const NotificationsContext = createContext<Context>(undefined!);

const NotificationsProvider: React.FC<Props> = (props: Props) => {

    useEffect(() => {
        Notifications.registerRemoteNotifications();

        Notifications.events().registerRemoteNotificationsRegistered(async (event: Registered) => {
            // Send the device token to API, so it can send push notifications
            const userService = UserService.getInstance();
            await userService.registerDevice(event.deviceToken);
        });

        Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
            console.error(event);
        });

        Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
            console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
            completion({ alert: false, sound: false, badge: false });
        });

        Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
            console.log(`Notification opened: ${notification.payload}`);
            completion();
        })
    }, [])

   return (
      <NotificationsContext.Provider value={{}}>
         {props.children}
      </NotificationsContext.Provider>
   )
};

export const useNotifications = (): Context => {
    const notifications = useContext<Context>(NotificationsContext);
    return notifications;
}

export default NotificationsProvider;