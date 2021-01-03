import React from "react";
import { Checkbox, Container, Page, Label, List, ActionItem } from "components";
import { useAuth, useTheme } from "context";
import { Switch } from "components";

const Notifications: React.FC = () => {
    const theme = useTheme();
    const auth = useAuth();

    return (
        <Page useHeaderHeight>
            <Container flex>
                <ActionItem title={<Label type="header" text="Notifications" />}>
                    <List 
                        items={[
                            { 
                                text: "Payment Reminder", 
                                action: <Switch value={false} />, 
                                onPress: () => {}
                            },
                            { 
                                text: "Income Reminder", 
                                action: <Switch value={false} />, 
                                onPress: () => {}
                            },
                            { 
                                text: "End of Budget", 
                                action: <Switch value={false} />, 
                                onPress: () => {}
                            },
                            {
                                text: "Start of Budget",
                                action: <Switch value={false} />,
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