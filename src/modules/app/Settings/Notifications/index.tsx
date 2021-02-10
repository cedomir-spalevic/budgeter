import React, { useEffect, useState } from "react";
import { Container, Page, Label, List, ActionItem } from "components";
import { Switch } from "components";
import { useUser } from "context/User";
import { useNotifications } from "context/Notifications";
import { setIn } from "formik";

const Notifications: React.FC = () => {
    const [paymentNotifications, setPaymentNotifications] = useState<boolean>(false);
    const [incomeNotifications, setIncomeNotifications] = useState<boolean>(false);
    const user = useUser();
    const notifications = useNotifications();

    const togglePaymentNotificationSetting = async () => {
        let p = !paymentNotifications;
        setPaymentNotifications(p);
        if(p) {
            notifications.askForPermissions()
                .then(() => {
                    user.update({ paymentNotifications: true })
                })
                .catch(reason => {
                    setPaymentNotifications(false);
                })
        }
        else {
            user.update({ paymentNotifications: false })
        }
    }

    const toggleIncomeNotificationSetting = async () => {
        let i = !incomeNotifications;
        setIncomeNotifications(i);
        if(i) {
            notifications.askForPermissions()
                .then(() => {
                    user.update({ incomeNotifications: true })
                })
                .catch(reason => {
                    setIncomeNotifications(false);
                })
        }
        else {
            user.update({ incomeNotifications: false })
        }
    }

    useEffect(() => {
        setPaymentNotifications(user.value.notificationPreferences.paymentNotifications);
        setIncomeNotifications(user.value.notificationPreferences.incomeNotifications);
    }, [])

    return (
        <Page>
            <Container allowScroll flex title="Notifications">
                <ActionItem title={<Label type="header" text="Notifications" />}>
                    <List 
                        items={[
                            { 
                                id: "payment-reminder",
                                text: "Payment Reminder", 
                                action: <Switch onChange={() => togglePaymentNotificationSetting()} value={paymentNotifications} />, 
                                onPress: () => {}
                            },
                            { 
                                id: "income-reminder",
                                text: "Income Reminder", 
                                action: <Switch onChange={() => toggleIncomeNotificationSetting()} value={incomeNotifications} />, 
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