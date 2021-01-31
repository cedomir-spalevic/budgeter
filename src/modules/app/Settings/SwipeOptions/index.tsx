import React from "react";
import { Container, Page, Label, List, ActionItem } from "components";
import { useAuth, useTheme } from "context";

const SwipeOptions: React.FC = () => {
    return (
        <Page>
            <Container allowScroll flex title="Swipe Options">
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