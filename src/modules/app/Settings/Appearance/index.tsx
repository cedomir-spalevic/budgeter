import React from "react";
import { Checkbox, Container, Page, Label, List, ActionItem } from "components";
import { useTheme } from "context";

const Appearance: React.FC = () => {
    const theme = useTheme();

    return (
        <Page>
            <Container allowScroll flex title="Appearance">
                <ActionItem title={<Label type="header" text="Appearance" />}>
                    <List 
                        items={[
                            { 
                                id: "auto",
                                text: "Automatic", 
                                action:<Checkbox checked={theme.kind === "auto"} />, 
                                onPress: () => theme.setKind("auto")
                            },
                            { 
                                id: "dark",
                                text: "Dark", 
                                action:<Checkbox checked={theme.kind === "dark"} />, 
                                onPress: () => theme.setKind("dark")
                            },
                            { 
                                id: "light",
                                text: "Light", 
                                action:<Checkbox checked={theme.kind === "light"} />, 
                                onPress: () => theme.setKind("light")
                            },
                        ]} 
                    />
                </ActionItem>
            </Container>
        </Page>
    )
}

export default Appearance;