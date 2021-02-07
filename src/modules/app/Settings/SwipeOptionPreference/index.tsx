import React, { useState } from "react";
import { Container, Page, Label, List, ActionItem, Checkbox } from "components";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useUser } from "context";

export interface SwipeOptionPreference {
    title: string;
    swipeOptionKey: string;
}

type ParamList = {
    "Preference": SwipeOptionPreference
}

type RouteProps = RouteProp<ParamList, "Preference">

const SwipeOptionPreference: React.FC = () => {
    const user = useUser();
    const route = useRoute<RouteProps>();
    
    return (
        <Page>
            <Container allowScroll flex title={route.params?.title}>
                <ActionItem title={<Label type="header" text={route.params?.title} />}>
                    <List 
                        items={[
                            { 
                                id: "left-swipe-preference",
                                text: "Left Swipe",
                                action: <Checkbox checked={user.swipeOptions[route.params?.swipeOptionKey] === "left"} />,
                                onPress: async () => await user.updateSwipeOptions({ ...user.swipeOptions, [route.params?.swipeOptionKey]: "left" })
                            },
                            { 
                                id: "right-swipe-preference",
                                text: "Right Swipe", 
                                action: <Checkbox checked={user.swipeOptions[route.params?.swipeOptionKey] === "right"} />,
                                onPress: async () => await user.updateSwipeOptions({ ...user.swipeOptions, [route.params?.swipeOptionKey]: "right" })
                            }
                        ]} 
                    />
                </ActionItem>
            </Container>
        </Page>
    )
}

export default SwipeOptionPreference;