import React, { useEffect } from "react";
import { 
    Icon
} from "components";
import { useTheme } from "context";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import EmptyBudget from "./EmptyBudget";
import BudgetList from "./BudgetList";
import { DueTodayItem } from "services/external/api/models/data/budget";
import { View } from "react-native";

const Home: React.FC = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const budgets = useBudgets();
    const incomes = budgets.value.incomes.slice(0, 3);
    const payments = budgets.value.payments.slice(0, 3);
    const dueToday = [
        ...budgets.value.incomes.filter(x => x.dueToday).map((x): DueTodayItem => ({ type: "income", item: x })),
        ...budgets.value.payments.filter(x => x.dueToday).map((x): DueTodayItem => ({ type: "payment", item: x}))
    ].slice(0, 2);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Icon onPress={() => {}} name="add-circle" color={theme.value.palette.primary} size={32} />
        })
    })

    if(incomes.length === 0 && payments.length === 0)
        return <EmptyBudget />
    return (
        <BudgetList 
            dueTodayItems={dueToday}
            incomeItems={incomes}
            paymentItems={payments}
        />
    )

}

export default Home;