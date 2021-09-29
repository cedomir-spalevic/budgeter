import React, { useEffect } from "react";
import { Icon, Menu } from "components";
import { useTheme } from "context";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import { DueTodayItem } from "services/models/data/budget";
import EmptyBudget from "./EmptyBudget";
import BudgetList from "./BudgetList";
import HomeRoutes from "../routes";
import { View } from "react-native";

const Home: React.FC = () => {
   const navigation = useNavigation();
   const theme = useTheme();
   const budgets = useBudgets();
   const incomes = budgets.value.incomes.slice(0, 3);
   const payments = budgets.value.payments.slice(0, 3);
   const dueToday = [
      ...budgets.value.incomes
         .filter((x) => x.dueToday)
         .map((x): DueTodayItem => ({ type: "income", item: x })),
      ...budgets.value.payments
         .filter((x) => x.dueToday)
         .map((x): DueTodayItem => ({ type: "payment", item: x }))
   ].slice(0, 2);

   useEffect(() => {
      navigation.setOptions({
         headerRight: () => (
            <View style={{ flexDirection: "row" }}>
               <Icon
                  name="toys"
                  color={theme.value.palette.primary}
                  size={32}
                  style={{
                     paddingRight: 10
                  }}
                  onPress={() => navigation.navigate(HomeRoutes.Playground)}
               />
               <Menu
                  options={[
                     {
                        onSelect: () => navigation.navigate(HomeRoutes.Income),
                        text: "Create Income"
                     },
                     {
                        onSelect: () => navigation.navigate(HomeRoutes.Payment),
                        text: "Create Payment"
                     }
                  ]}
               >
                  <Icon
                     name="add-circle"
                     color={theme.value.palette.primary}
                     size={32}
                  />
               </Menu>
            </View>
         )
      });
   });

   if (incomes.length === 0 && payments.length === 0) return <EmptyBudget />;
   return (
      <BudgetList
         dueTodayItems={dueToday}
         incomeItems={incomes}
         paymentItems={payments}
      />
   );
};

export default Home;
