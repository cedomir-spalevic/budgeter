import React, { useState } from "react";
import {
    Page,
    Container,
    ActionList,
    ActionItem,
    Searchbox,
    Label,
    SummaryView,
    ConfirmDialog
} from "components";
import { useTheme } from "context";
import { useIncomes } from "context/Incomes";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
//import { IncomesRoutes } from "../../routes";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { Income } from "services/external/api/models/data/income";

const BudgetIncomesList: React.FC = () => {
    const [incomeToDelete, setIncomeToDelete] = useState<Income>();
    const budgets = useBudgets();
    const incomes = useIncomes();
    const navigation = useNavigation();
    const theme = useTheme();

    const deleteIncome = async () => {
        await incomes.delete(incomeToDelete.id);
        setIncomeToDelete(undefined);
    }

    return (
        <Page>
            <Container title="Incomes" allowScroll fullWith>
                <Container>
                    <Label type="header" text="Incomes" />
                </Container>
                <Container fullWith>
                    <ActionList
                        items={budgets.value.incomes.map(x => ({
                            id: x.id,
                            text: x.title,
                            note: { text: toCurrency(x.amount), color: "green" },
                            onPress: () => {},
                            //onPress: () => navigation.navigate(IncomesRoutes.Income, { income: x }),
                            //leftSwipeContent: { color: theme.value.palette.error, iconName: "delete" },
                            //onLeftActionRelease: () => setIncomeToDelete(x)
                        }))}
                    />
                </Container>
            </Container>
            <Container fullWith>
                <SummaryView>
                    <View style={{ flexDirection: "row" }}>
                        <Label text="Total:" type="regular" color={theme.value.palette.primary} style={{ paddingRight: 5 }} />
                        <Label text={toCurrency(incomes.values.map(x => x.amount).reduce((p, c) => p + c, 0))} type="regular" />
                    </View>
                </SummaryView>
            </Container>
            {incomeToDelete && (
                <ConfirmDialog
                    visible={true}
                    title={`Delete ${incomeToDelete.title}?`}
                    onTouchOutside={() => setIncomeToDelete(undefined)}
                    message="Are you sure want to delete this income? This will be removed from all of your budgets."
                    positiveButton={{
                        title: "Yes",
                        onPress: () => deleteIncome()
                    }}
                    negativeButton={{
                        title: "No",
                        onPress: () => setIncomeToDelete(undefined)
                    }}
                />
            )}
        </Page>
    )
}

export default BudgetIncomesList;