import React, { useEffect } from "react";
import BudgetsTab from "./BudgetsTab";
import { Empty, Icon } from "components";
import { useNavigation } from "@react-navigation/native";
import { BudgetsRoute } from "../routes";
import { colors } from "styles";
import { useBudgets } from "context/Budgets";

const HomeScreen: React.FC = () => {
   const budgets = useBudgets();
   const navigation = useNavigation();

   const createNewBudget = () => navigation.navigate(BudgetsRoute.Budget);

   useEffect(() => {
      if(budgets.budgets.length > 0)
         navigation.setOptions({
            headerRight: () => (
               <Icon
                  name="add"
                  style={{ paddingRight: 20, color: colors.primary, fontSize: 32 }}
                  onPress={() => createNewBudget()}
               />
            )
         })
   })

   if (budgets.budgets.length === 0)
      return (
         <Empty 
            message="You don't have any Budgets yet!" 
            addCreateNew={true}
            onCreateNewClick={() => createNewBudget()}
         />
      )

   return <BudgetsTab />
};

export default HomeScreen;