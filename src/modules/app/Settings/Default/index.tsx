import React from "react";
import { View } from "react-native";
import { Container, Page, Label, List, ActionItem } from "components";
import { useAuth, useTheme } from "context";
import { useNavigation } from "@react-navigation/native";
import { SettingsRoutes } from "../routes";

const Settings: React.FC = () => {
    const theme = useTheme();
    const auth = useAuth();
    const navigation = useNavigation();

    return (
        <Page useHeaderHeight>
            <Container justifyContent="space-between" flex>
                <ActionItem title={<Label type="header" text="Settings" />}>
                    <List 
                        items={[
                            { text: "Appearance", onPress: () => navigation.navigate(SettingsRoutes.Appearance) },
                            { text: "Notifications", onPress: () => navigation.navigate(SettingsRoutes.Notifications) },
                            { text: "Swipe Options", onPress: () => navigation.navigate(SettingsRoutes.SwipeOptions) }
                        ]} 
                    />
                </ActionItem>
                
                <List 
                        items={[{ 
                            text: "Log out", 
                            textColor: theme.pallette.error, 
                            iconColor:  theme.pallette.error,
                            iconName: "exit-to-app",
                            onPress: () => auth.logout()
                        }]} 
                    />
            </Container>
        </Page>
    )
}

export default Settings;