import React from "react";
import { Container, Page, Label, List, ActionItem } from "components";
import { Switch } from "components";

const Notifications: React.FC = () => {
    return (
        <Page>
            <Container allowScroll flex title="Notifications">
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