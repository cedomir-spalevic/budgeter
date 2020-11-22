import React, { useContext, useEffect } from "react";
import { BudgetsContext } from "context/Budgets";
import BudgetsTab from "../BudgetsTab";
import { Empty, Icon } from "components";
import { useNavigation } from "@react-navigation/native";
import { BudgetsRoute } from "../routes";
import { Budget } from "services/api/models";
import { colors } from "styles";

const HomeScreen: React.FC = () => {
   const budgetsContext = useContext(BudgetsContext);
   const navigation = useNavigation();

   const onSave = async (budget: Budget) => {
      const saved = await budgetsContext.budgetOnSave(budget);
      if (saved)
         navigation.goBack();
      return saved;
   }

   useEffect(() => {
      budgetsContext.getBudgets();
   }, [])

   if (budgetsContext.budgets.length === 0)
      return (
         <Empty 
            message="You don't have any Budgets yet!" 
            addCreateNew={true}
            onCreateNewClick={() => navigation.navigate(BudgetsRoute.Budget, { onSave })}
         />
      )

   navigation.setOptions({
      headerRight: () => (
         <Icon
            name="add"
            style={{ paddingRight: 20, color: colors.primary, fontSize: 32 }}
            onPress={() => navigation.navigate(BudgetsRoute.Budget, { onSave })}
         />
      )
   })

   return <BudgetsTab />
};

export default HomeScreen;