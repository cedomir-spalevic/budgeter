import React from "react";
import { Checkbox, Container, Page, Label, List, ActionItem } from "components";
import { useAuth, useTheme } from "context";

const Appearance: React.FC = () => {
    const theme = useTheme();
    const auth = useAuth();

    return (
        <Page useHeaderHeight>
            <Container flex>
                <ActionItem title={<Label type="header" text="Appearance" />}>
                    <List 
                        items={[
                            { 
                                text: "Automatic", 
                                action:<Checkbox checked={theme.theme === "auto"} />, 
                                onPress: () => theme.setTheme("auto")
                            },
                            { 
                                text: "Dark", 
                                action:<Checkbox checked={theme.theme === "dark"} />, 
                                onPress: () => theme.setTheme("dark")
                            },
                            { 
                                text: "Light", 
                                action:<Checkbox checked={theme.theme === "light"} />, 
                                onPress: () => theme.setTheme("light")
                            },
                        ]} 
                    />
                </ActionItem>
            </Container>
        </Page>
    )
}

export default Appearance;