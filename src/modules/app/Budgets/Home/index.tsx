import React, { useEffect } from "react";
import BudgetsTab from "./BudgetsTab";
import { Empty, Icon } from "components";
import { useNavigation } from "@react-navigation/native";
import { BudgetsRoute } from "../routes";
import { Budget } from "services/external/api/models";
import { colors } from "styles";
import { useBudgets } from "context/Budgets";

const HomeScreen: React.FC = () => {
   const budgets = useBudgets();
   const navigation = useNavigation();

   const onSave = async (budget: Budget) => {
      const saved = await budgets.budgetOnSave(budget);
      if (saved)
         navigation.goBack();
      return saved;
   }

   useEffect(() => {
      if(budgets.budgets.length > 0)
         navigation.setOptions({
            headerRight: () => (
               <Icon
                  name="add"
                  style={{ paddingRight: 20, color: colors.primary, fontSize: 32 }}
                  onPress={() => navigation.navigate(BudgetsRoute.Budget, { onSave })}
               />
            )
         })
   })

   if (budgets.budgets.length === 0)
      return (
         <Empty 
            message="You don't have any Budgets yet!" 
            addCreateNew={true}
            onCreateNewClick={() => navigation.navigate(BudgetsRoute.Budget, { onSave })}
         />
      )

   return <BudgetsTab />
};

export default HomeScreen;