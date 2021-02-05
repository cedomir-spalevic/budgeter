import React, { useEffect } from "react";
import { Icon } from "components";
import { useTheme } from "context";
import { useIncomes } from "context/Incomes";
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

    if(incomes.empty)
        return <NoIncomes />
    return <IncomesList />
}

export default Incomes;