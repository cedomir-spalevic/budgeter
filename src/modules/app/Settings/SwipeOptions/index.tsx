import React from "react";
import { Container, Page, Label, List, ActionItem } from "components";
import { useNavigation } from "@react-navigation/native";
import SettingsRoutes from "../routes";

const SwipeOptions: React.FC = () => {
   const navigation = useNavigation();

   return (
      <Page>
         <Container allowScroll flex title="Swipe Options">
            <ActionItem title={<Label type="header" text="Swipe Options" />}>
               <List
                  items={[
                     {
                        id: "delete-income-swipe-option",
                        text: "Delete Income",
                        onPress: () =>
                           navigation.navigate(
                              SettingsRoutes.SwipeOptionPreference,
                              {
                                 title: "Delete Income",
                                 swipeOptionKey: "deleteIncome"
                              }
                           )
                     },
                     {
                        id: "delete-payment-swipe-option",
                        text: "Delete Payment",
                        onPress: () =>
                           navigation.navigate(
                              SettingsRoutes.SwipeOptionPreference,
                              {
                                 title: "Delete Payment",
                                 swipeOptionKey: "deletePayment"
                              }
                           )
                     }
                  ]}
               />
            </ActionItem>
         </Container>
      </Page>
   );
};

export default SwipeOptions;
