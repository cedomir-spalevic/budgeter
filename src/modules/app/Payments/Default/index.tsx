import React, { useEffect } from "react";
import { 
    Container,
    List,
    Empty,
    Page, 
    Label, 
    ActionItem,
    Icon
} from "components";
import { View } from "react-native";
import { useAuth, useTheme, usePayments, useNavigationHeader } from "context";
import { useNavigation } from "@react-navigation/native";

const Payments: React.FC = () => {
    const navigation = useNavigation();
    const payments = usePayments();
    const theme = useTheme();

    const renderPayments = () => {
        return (
            <ActionItem title={<Label type="header" text="Payments" />}>
                <List items={[
                    { text: "Netflix", onPress: () => {} }
                ]} />
            </ActionItem>
        )
    }

    const renderEmpty = () => (
        <>
            <Label type="header" text="Payments" />
            <Container flex verticallyCenter>
                <Empty message="No payments!" addCreateNew={false} onCreateNewClick={() => {}} />
            </Container>
        </>
    )

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Icon name="add" color={theme.pallette.primary} size={32} />
        })
    })

    return (
        <Page useHeaderHeight>
            <Container flex>
                {payments.values.length === 0 ? renderPayments() : renderPayments()}
            </Container>
        </Page>
    )
}

export default Payments;