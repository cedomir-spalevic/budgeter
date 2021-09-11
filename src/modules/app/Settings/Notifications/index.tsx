import React, { useCallback, useEffect, useState } from "react";
import { Container, Page, Label, List, ActionItem, Switch } from "components";
import { useUser } from "context/User";
import { useNotifications } from "context/Notifications";

const Notifications: React.FC = () => {
   const [paymentNotifications, setPaymentNotifications] = useState<boolean>(
      false
   );
   const [incomeNotifications, setIncomeNotifications] = useState<boolean>(
      false
   );
   const user = useUser();
   const notifications = useNotifications();
   const setPreferences = useCallback(() => {
      setPaymentNotifications(
         user.value.notificationPreferences.paymentNotifications!
      );
      setIncomeNotifications(
         user.value.notificationPreferences.incomeNotifications!
      );
   }, [
      user.value.notificationPreferences.incomeNotifications,
      user.value.notificationPreferences.paymentNotifications
   ]);

   const togglePaymentNotificationSetting = async () => {
      const newPaymentNotificationPreference = !paymentNotifications;
      setPaymentNotifications(newPaymentNotificationPreference);
      if (newPaymentNotificationPreference) {
         notifications
            .askForPermissions()
            .then(() => {
               user.update({ paymentNotifications: true });
            })
            .catch(() => {
               setPaymentNotifications(false);
            });
      } else {
         user.update({ paymentNotifications: false });
      }
   };

   const toggleIncomeNotificationSetting = async () => {
      const newIncomeNotificationPreference = !incomeNotifications;
      setIncomeNotifications(newIncomeNotificationPreference);
      if (newIncomeNotificationPreference) {
         notifications
            .askForPermissions()
            .then(() => {
               user.update({ incomeNotifications: true });
            })
            .catch(() => {
               setIncomeNotifications(false);
            });
      } else {
         user.update({ incomeNotifications: false });
      }
   };

   useEffect(() => {
      setPreferences();
   }, [setPreferences]);

   return (
      <Page>
         <Container allowScroll flex title="Notifications">
            <ActionItem title={<Label type="header" text="Notifications" />}>
               <List
                  items={[
                     {
                        id: "payment-reminder",
                        text: "Payment Reminder",
                        action: (
                           <Switch
                              onChange={() =>
                                 togglePaymentNotificationSetting()
                              }
                              value={paymentNotifications}
                           />
                        )
                     },
                     {
                        id: "income-reminder",
                        text: "Income Reminder",
                        action: (
                           <Switch
                              onChange={() => toggleIncomeNotificationSetting()}
                              value={incomeNotifications}
                           />
                        )
                     }
                  ]}
               />
            </ActionItem>
         </Container>
      </Page>
   );
};

export default Notifications;
