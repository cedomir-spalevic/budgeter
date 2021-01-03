import React from "react";
import { Checkbox, Container, Page, Label, List, ActionItem } from "components";
import { useAuth, useTheme } from "context";

const SwipeOptions: React.FC = () => {
    const theme = useTheme();
    const auth = useAuth();

    return (
        <Page useHeaderHeight>
            <Container flex>
                <ActionItem title={<Label type="header" text="Swipe Options" />}>
                    <List 
                        items={[
                            { 
                                text: "Left swipe", 
                                onPress: () => {}
                            },
                            { 
                                text: "Right swipe", 
                                onPress: () => {}
                            }
                        ]} 
                    />
                </ActionItem>
            </Container>
        </Page>
    )
}

export default SwipeOptions;