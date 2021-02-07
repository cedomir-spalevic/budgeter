import React from "react";
import { Container, Page, Label, List, ActionItem } from "components";
import { useAuth, useTheme } from "context";
import { useNavigation } from "@react-navigation/native";
import { SettingsRoutes } from "../routes";

const Settings: React.FC = () => {
    const theme = useTheme();
    const auth = useAuth();
    const navigation = useNavigation();

    return (
        <Page>
            <Container allowScroll justifyContent="space-between" flex title="Settings">
                <ActionItem title={<Label type="header" text="Settings" />}>
                    <List 
                        items={[
                            { id: "apperance", text: "Appearance", onPress: () => navigation.navigate(SettingsRoutes.Appearance) },
                            { id: "notifications", text: "Notifications", onPress: () => navigation.navigate(SettingsRoutes.Notifications) },
                            { id: "swipeOptions", text: "Swipe Options", onPress: () => navigation.navigate(SettingsRoutes.SwipeOptions) }
                        ]} 
                    />
                </ActionItem>
                <List 
                    items={[{ 
                        id: "log out",
                        text: "Log out", 
                        textColor: theme.value.palette.error, 
                        iconColor:  theme.value.palette.error,
                        iconName: "exit-to-app",
                        onPress: () => auth.logout()
                    }]} 
                />
            </Container>
        </Page>
    )
}

export default Settings;