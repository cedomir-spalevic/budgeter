import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { SceneMap, Route, TabBar, TabView } from "react-native-tab-view";
import { BudgetsContext } from "context/Budgets";
import { List, Empty, Icon, SwipeContainer } from "components";
import { colors, globalStyles } from "styles";
import { Budget } from "services/api/models";
import { TouchableHighlightBase, View } from "react-native";
import { formatDate } from "services/utils/datetime";
import { BudgetsRoute } from "../routes";
import { ConfirmDialog } from "react-native-simple-dialogs";
import Toast from "react-native-root-toast";

enum BudgetType {
   Active = "Active",
   Completed = "Completed"
}

const BudgetsTab: React.FC = () => {
   const navigation = useNavigation();
   const budgetsContext = useContext(BudgetsContext);
   const [index, setIndex] = useState<number>(0);
   const [routes] = useState<Route[]>([
      { key: "active", title: BudgetType.Active },
      { key: "completed", title: BudgetType.Completed }
   ])
   const [budgetToDelete, setBudgetToDelete] = useState<Budget>();

   const getBudgets = async () => {
      await budgetsContext.getBudgets();
   }

   const navigateToPaymentPage = async (budgets: Budget[], id: string) => {
      let budget = budgets.find(x => x.budgetId === id);
      budget = await budgetsContext.getPayments(budget);
      navigation.navigate(BudgetsRoute.BudgetPayments, { budget });
   }

   const deleteBudget = async () => {
      if(!budgetToDelete)
         return;
      const deleted = await budgetsContext.deleteBudget(budgetToDelete.budgetId!);
      if(!deleted)
         Toast.show(`Unable to delete ${budgetToDelete.name}`);
      setBudgetToDelete(undefined);
   }

   const completeBudget = async (budget: Budget) => {
      budget.completed = true;
      const budgetResponse = await budgetsContext.budgetOnSave(budget);
      if(!budgetResponse || !budgetResponse.valid)
         Toast.show(`Unable to complete ${budget.name}`);
   }

   const renderBudgetList = (budgets: Budget[], type: BudgetType) => {
      if (budgets.length === 0)
         return (
            <Empty
               message={`No ${type} Budgets!`}
               addCreateNew={false}
            />
         )
      else
         return (
            <View style={globalStyles.listContainer}>
               {budgetToDelete && 
                  <ConfirmDialog
                     visible={true}
                     title={`Delete ${budgetToDelete.name}`}
                     onTouchOutside={() => setBudgetToDelete(undefined)}
                     message="Are you sure you want to continue?"
                     positiveButton={{
                        title: "Yes",
                        onPress: () => deleteBudget()
                     }}
                     negativeButton={{
                        title: "No",
                        onPress: () => setBudgetToDelete(undefined)
                     }}
                  />}
               <List
                  items={budgets.map(x => ({
                     id: x.budgetId,
                     name: x.name,
                     description: `${formatDate(x.startDate)} - ${formatDate(x.endDate)}`,
                     leftSwipeContent: { color: colors.red, iconName: "delete" },
                     rightSwipeContent: { color: colors.green, iconName: "check" },
                     onLeftActionRelease: () => setBudgetToDelete(x),
                     onRightActionRelease: () => completeBudget(x),
                     icon: (type === BudgetType.Completed ? 
                        <Icon name="check-circle" color={colors.green} /> : null)
                  }))}
                  onRefresh={() => getBudgets()}
                  onPressAction={(id: string) => navigateToPaymentPage(budgets, id)}
               />
            </View>
         )
   }

   const renderScene = SceneMap({
      active: () => renderBudgetList(budgetsContext.budgets.filter(x => !x.completed), BudgetType.Active),
      completed: () => renderBudgetList(budgetsContext.budgets.filter(x => x.completed), BudgetType.Completed)
   })

   const renderTabBar = (props) => (
      <TabBar
         {...props}
         indicatorStyle={{ backgroundColor: colors.primary }}
         style={{ backgroundColor: colors.white }}
         activeColor={colors.primary}
         inactiveColor={colors.secondaryDarker}
      />
   )
   return (
      <TabView
         navigationState={{ index, routes }}
         onIndexChange={setIndex}
         renderScene={renderScene}
         renderTabBar={renderTabBar}
         swipeEnabled={false}
         lazy
      />
   )
}

export default BudgetsTab;