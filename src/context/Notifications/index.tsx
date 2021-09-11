import React, { createContext, useContext } from "react";
import { Notifications, Registered } from "react-native-notifications";
import AuthenticationService from "services/external/api/auth";

interface Props {
   children: React.ReactNode;
}

interface Context {
   askForPermissions: () => Promise<unknown>;
}

const NotificationsContext = createContext<Context>(undefined!);

const NotificationsProvider: React.FC<Props> = (props: Props) => {
   const askForPermissions = () =>
      new Promise<void>((resolve, reject) => {
         Notifications.events().registerRemoteNotificationsRegistered(
            async (event: Registered) => {
               try {
                  const authenticationService = AuthenticationService.getInstance();
                  await authenticationService.registerDevice(event.deviceToken);
                  resolve();
               } catch (error) {
                  reject();
               }
            }
         );

         Notifications.events().registerRemoteNotificationsRegistrationFailed(
            (event) => {
               reject(event.localizedDescription);
            }
         );

         Notifications.registerRemoteNotifications();
      });

   return (
      <NotificationsContext.Provider value={{ askForPermissions }}>
         {props.children}
      </NotificationsContext.Provider>
   );
};

export const useNotifications = (): Context =>
   useContext<Context>(NotificationsContext);

export default NotificationsProvider;
