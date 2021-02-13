import React, { useState } from "react";
import {
    Page,
    Container,
    ActionList,
    ActionItem,
    Searchbox,
    Label,
    SummaryView,
    ConfirmDialog,
    Progress
} from "components";
import { useTheme, useUser } from "context";
import { useIncomes } from "context/Incomes";
import { useNavigation } from "@react-navigation/native";
import { IncomesRoutes } from "../../routes";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { Income } from "services/external/api/models/data/income";

const IncomesList: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [incomeToDelete, setIncomeToDelete] = useState<Income>();
    const incomes = useIncomes();
    const navigation = useNavigation();
    const theme = useTheme();
    const user = useUser();
    
    const search = (sv: string) => {
        setSearchValue(sv);
        incomes.get(sv);
    }

    const getNext = async () => {
        if(loading)
            return;
        setLoading(true);
        await incomes.get(searchValue, true);
        setLoading(false);
    }

    const deleteIncome = async () => {
        await incomes.delete(incomeToDelete.id);
        setIncomeToDelete(undefined);
    }

    return (
        <Page>
            <Container title="Incomes" allowScroll fullWith onCloseToBottom={getNext}>
                <Container>
                    <ActionItem title={<Label type="header" text="Incomes" />}>
                        <Searchbox 
                            placeholder="Search Incomes"
                            onChange={search}
                        />
                    </ActionItem>
                </Container>
                <Container fullWith>
                    <ActionList
                        items={incomes.values.map(x => {
                            let swipeContentKey = "leftSwipeContent", actionReleaseKey = "onLeftActionRelease";
                            if(user.swipeOptions.deleteIncome === "right") {
                                swipeContentKey = "rightSwipeContent";
                                actionReleaseKey = "onRightActionRelease";
                            }

                            return ({
                                id: x.id,
                                text: x.title,
                                note: { text: toCurrency(x.amount), color: "green" },
                                onPress: () => navigation.navigate(IncomesRoutes.Income, { income: x }),
                                [swipeContentKey]: { color: theme.value.palette.red, iconName: "delete" },
                                [actionReleaseKey]: () => setIncomeToDelete(x)
                            })
                        })}
                    />
                </Container>
                {loading && <View style={{ paddingTop: 15 }}><Progress size="small" /></View>}
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