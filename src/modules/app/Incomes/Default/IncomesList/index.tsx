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
import { useIncomes, useTheme } from "context";
import { useNavigation } from "@react-navigation/native";
import { IncomesRoutes } from "../../routes";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { Income } from "services/external/api/models/data/income";

const IncomesList: React.FC = () => {
    const [incomeToDelete, setIncomeToDelete] = useState<Income>();
    const incomes = useIncomes();
    const navigation = useNavigation();
    const theme = useTheme();

    const deleteIncome = async () => {
        await incomes.delete(incomeToDelete.id);
        setIncomeToDelete(undefined);
    }

    return (
        <Page>
            <Container allowScroll fullWith>
                <Container>
                    <ActionItem title={<Label type="header" text="Incomes" />}>
                        <Searchbox 
                            placeholder="Search Incomes"
                            onChange={searchValue => incomes.get(searchValue)}
                        />
                    </ActionItem>
                </Container>
                <Container fullWith>
                    <ActionList
                        items={incomes.values.map(x => ({
                            id: x.id,
                            text: x.title,
                            note: { text: `$${x.amount}`, color: "green" },
                            onPress: () => navigation.navigate(IncomesRoutes.Income, { income: x }),
                            leftSwipeContent: { color: theme.value.palette.error, iconName: "delete" },
                            onLeftActionRelease: () => setIncomeToDelete(x)
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

export default IncomesList;