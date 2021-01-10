import React, { useEffect } from "react";
import { 
    ActionList,
    Container,
    List,
    Empty,
    Page, 
    Label, 
    ActionItem,
    Icon,
    Searchbox
} from "components";
import { View } from "react-native";
import { useAuth, useTheme, usePayments, useNavigationHeader } from "context";
import { useNavigation } from "@react-navigation/native";
import { PaymentsRoutes } from "../routes";

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
            headerRight: () => <Icon onPress={() => navigation.navigate(PaymentsRoutes.Payment)} name="add" color={theme.value.palette.primary} size={32} />
        })
    })

    return (
        <Page useHeaderHeight>
            <Container>
                <ActionItem title={<Label type="header" text="Payments" />}>
                    <Searchbox 
                        placeholder="Search payments"
                    />
                </ActionItem>
            </Container>
            <Container fullWith>
                <ActionList items={[
                    { text: "Netflix", note: { text: "- $12.99", color: "red" }, onPress: () => {} },
                    { text: "Capital One Credit Card", onPress: () => {} }
                ]} />
            </Container>
            {/* <Container flex>
                {payments.values.length === 0 ? renderPayments() : renderPayments()}
            </Container> */}
        </Page>
    )
}

export default Payments;