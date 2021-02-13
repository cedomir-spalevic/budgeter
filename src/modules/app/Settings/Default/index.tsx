import React from "react";
import { Container, Page, Label, List, ActionItem, Spacer } from "components";
import { useAuth, useTheme } from "context";
import { useNavigation } from "@react-navigation/native";
import { SettingsRoutes } from "../routes";
import { View } from "react-native";

const Settings: React.FC = () => {
    const theme = useTheme();
    const auth = useAuth();
    const navigation = useNavigation();

    return (
        <Page>
            <Container allowScroll justifyContent="space-between" flex title="Settings" preventBottomMargin>
                <ActionItem title={<Label type="header" text="Settings" />}>
                    <List 
                        items={[
                            { id: "apperance", text: "Appearance", onPress: () => navigation.navigate(SettingsRoutes.Appearance) },
                            { id: "notifications", text: "Notifications", onPress: () => navigation.navigate(SettingsRoutes.Notifications) },
                            { id: "swipeOptions", text: "Swipe Options", onPress: () => navigation.navigate(SettingsRoutes.SwipeOptions) }
                        ]} 
                    />
                </ActionItem>
                <View>
                    <List 
                        items={[{ 
                            id: "log out",
                            text: "Log out", 
                            textColor: theme.value.palette.red, 
                            iconColor:  theme.value.palette.red,
                            iconName: "exit-to-app",
                            onPress: () => auth.logout()
                        }]} 
                    />
                    <Spacer />
                </View>
            </Container>
        </Page>
    )
}

export default Settings;