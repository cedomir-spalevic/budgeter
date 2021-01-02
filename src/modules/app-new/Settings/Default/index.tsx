import React from "react";
import { View } from "react-native";
import { Container, Page, Label, List } from "components-new";
import { useAuth, useTheme } from "context-new";

const Settings: React.FC = () => {
    const theme = useTheme();
    const auth = useAuth();

    return (
        <Page>
            <Container flex>
                <Label type="header" text="Settings" />
                <View style={{ flex: 1, justifyContent: "space-between", paddingVertical: 25 }}>
                    <List 
                        items={[
                            { text: "Appearance", onPress: () => {} },
                            { text: "Notifications", onPress: () => {} },
                            { text: "Swipe Options", onPress: () => {} }
                        ]} 
                    />
                    <List 
                        items={[{ 
                            text: "Log out", 
                            textColor: theme.pallette.error, 
                            iconColor:  theme.pallette.error,
                            iconName: "exit-to-app",
                            onPress: () => auth.logout()
                        }]} 
                    />
                </View>
            </Container>
        </Page>
    )
}

export default Settings;