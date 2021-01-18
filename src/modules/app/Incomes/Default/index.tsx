import React, { useEffect } from "react";
import { Icon } from "components";
import { useTheme, useIncomes } from "context";
import { useNavigation } from "@react-navigation/native";
import { IncomesRoutes } from "../routes";
import NoIncomes from "./NoIncomes";
import IncomesList from "./IncomesList";

const Incomes: React.FC = () => {
    const theme = useTheme();
    const incomes = useIncomes();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => <Icon onPress={() => navigation.navigate(IncomesRoutes.Income)} name="add-circle" color={theme.value.palette.primary} size={32} />
        })
    })

    if(incomes.values.length === 0)
        return <NoIncomes />
    return <IncomesList />
}

export default Incomes;