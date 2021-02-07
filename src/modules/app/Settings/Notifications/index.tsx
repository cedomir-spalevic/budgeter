import React from "react";
import { Container, Page, Label, List, ActionItem } from "components";
import { Switch } from "components";
import { useUser } from "context/User";
import { useNotifications } from "context/Notifications";

const Notifications: React.FC = () => {
    const user = useUser();
    const notifications = useNotifications();

    const togglePaymentNotificationSetting = async () => {
        if(!user.value.notificationPreferences.paymentNotifications) {
            notifications.askForPermissions().then(() => {
                user.update({ paymentNotifications: true })
            })
        }
        else {
            user.update({ paymentNotifications: false })
        }
    }

    const toggleIncomeNotificationSetting = async () => {
        if(!user.value.notificationPreferences.incomeNotifications) {
            notifications.askForPermissions().then(() => {
                user.update({ incomeNotifications: true })
            })
        }
        else {
            user.update({ incomeNotifications: false })
        }
    }

    return (
        <Page>
            <Container allowScroll flex title="Notifications">
                <ActionItem title={<Label type="header" text="Notifications" />}>
                    <List 
                        items={[
                            { 
                                id: "payment-reminder",
                                text: "Payment Reminder", 
                                action: <Switch onChange={() => togglePaymentNotificationSetting()} value={user.value.notificationPreferences.paymentNotifications} />, 
                                onPress: () => {}
                            },
                            { 
                                id: "income-reminder",
                                text: "Income Reminder", 
                                action: <Switch onChange={() => toggleIncomeNotificationSetting()} value={user.value.notificationPreferences.incomeNotifications} />, 
                                onPress: () => {}
                            }
                        ]} 
                    />
                </ActionItem>
            </Container>
        </Page>
    )
}

export default Notifications;