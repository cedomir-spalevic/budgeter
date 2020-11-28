<<<<<<< HEAD
import React, { useEffect } from "react";
=======
import React, { useContext, useEffect } from "react";
>>>>>>> 642410ae8d16e7c8e15ddad31d785a746db0a912
import BudgetsTab from "../BudgetsTab";
import { Empty, Icon } from "components";
import { useNavigation } from "@react-navigation/native";
import { BudgetsRoute } from "../routes";
import { Budget } from "services/external/api/models";
import { colors } from "styles";
<<<<<<< HEAD
import { useBudgets } from "context/Budgets";
=======
import { useBudgets } from "context/Budgets/context";
>>>>>>> 642410ae8d16e7c8e15ddad31d785a746db0a912

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
      budgets.getBudgets();
   }, [])

   if (budgets.budgets.length === 0)
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