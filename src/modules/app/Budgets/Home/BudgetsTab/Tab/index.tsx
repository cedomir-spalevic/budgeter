import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { List, Empty, Icon } from "components";
import { colors, globalStyles } from "styles";
import { Budget } from "services/external/api/models/data";
import { View } from "react-native";
import { formatDate } from "services/internal/datetime";
import { ConfirmDialog } from "react-native-simple-dialogs";
import { useBudgets } from "context/Budgets";
import { BudgetsRoute } from "modules/app/Budgets/routes";

interface Props {
    items: Budget[];
    type: "Active" | "Completed";
}

const Tab: React.FC<Props> = (props: Props) => {
   const navigation = useNavigation();
   const budgets = useBudgets();
   const [budgetToDelete, setBudgetToDelete] = useState<Budget>();

   const navigateToPaymentPage = async (budget: Budget) => {
      navigation.navigate(BudgetsRoute.BudgetPayments, { budget });
   }

   const deleteBudget = async () => {
        if(!budgetToDelete)
            return;
        await budgets.deleteBudget(budgetToDelete._id);
        setBudgetToDelete(undefined);
   }

   const completeBudget = async (budget: Budget) => {
      const updatedBudget: Partial<Budget> = { completed: !budget.completed }
      await budgets.updateBudget(budget._id, updatedBudget);
   }

   if(props.items.length === 0)
        return (
            <Empty
                message={`No ${props.type} Budgets!`}
                addCreateNew={false}
            />
        )
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
                items={props.items.map(x => ({
                    id: x._id,
                    name: x.name,
                    description: `${formatDate(x.startDate)} - ${formatDate(x.endDate)}`,
                    leftSwipeContent: { color: colors.red, iconName: "delete" },
                    rightSwipeContent: { color: colors.green, iconName: "check" },
                    onLeftActionRelease: () => setBudgetToDelete(x),
                    onRightActionRelease: () => completeBudget(x),
                    onPressAction: () => navigateToPaymentPage(x),
                    icon: (props.type === "Completed" ? 
                    <Icon name="check-circle" color={colors.green} /> : null)
                }))}
                onRefresh={() => budgets.getBudgets()}
            />
        </View>
    )
}

export default Tab;