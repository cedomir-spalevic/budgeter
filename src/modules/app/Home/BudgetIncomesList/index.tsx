import React, { useCallback, useEffect, useState } from "react";
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
import { makeStyles, useTheme, useUser } from "context";
import { useIncomes } from "context/Incomes";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { BudgetIncome } from "services/external/api/models/data/income";
import HomeRoutes from "../routes";

const useStyles = makeStyles(() => ({
   summaryView: {
      flexDirection: "row"
   },
   summaryLabel: {
      paddingRight: 5
   }
}));

const BudgetIncomesList: React.FC = () => {
   const [list, setList] = useState<BudgetIncome[]>([]);
   const [incomeToDelete, setIncomeToDelete] = useState<BudgetIncome>();
   const budgets = useBudgets();
   const incomes = useIncomes();
   const navigation = useNavigation();
   const theme = useTheme();
   const user = useUser();
   const styles = useStyles();
   const setBudgetIncomes = useCallback(() => {
      setList([...budgets.value.incomes]);
   }, [budgets.value.incomes]);

   const onSearch = (searchValue: string) => {
      const filteredList = budgets.value.incomes.filter((x) =>
         x.title.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
      );
      setList([...filteredList]);
   };

   const deleteIncome = async () => {
      await incomes.delete(incomeToDelete.id);
      setIncomeToDelete(undefined);
   };

   useEffect(() => {
      setBudgetIncomes();
   }, [setBudgetIncomes]);

   return (
      <Page>
         <Container title="Incomes" allowScroll fullWith>
            <Container>
               <ActionItem title={<Label type="header" text="Incomes" />}>
                  <Searchbox placeholder="Search Incomes" onChange={onSearch} />
               </ActionItem>
            </Container>
            <Container fullWith>
               <ActionList
                  items={list.map((x) => {
                     let swipeContentKey = "leftSwipeContent";
                     let actionReleaseKey = "onLeftActionRelease";
                     if (user.swipeOptions.deleteIncome === "right") {
                        swipeContentKey = "rightSwipeContent";
                        actionReleaseKey = "onRightActionRelease";
                     }
                     return {
                        id: x.id,
                        text: x.title,
                        note: {
                           text: `${toCurrency(x.amount)} (x${
                              x.numberOfOccurrences
                           })`,
                           color: "green"
                        },
                        onPress: () =>
                           navigation.navigate(HomeRoutes.Income, {
                              income: x
                           }),
                        [swipeContentKey]: {
                           color: theme.value.palette.red,
                           iconName: "delete"
                        },
                        [actionReleaseKey]: () => setIncomeToDelete(x)
                     };
                  })}
               />
            </Container>
         </Container>
         <Container fullWith>
            <SummaryView>
               <View style={styles.summaryView}>
                  <Label
                     text="Total:"
                     type="regular"
                     color={theme.value.palette.primary}
                     style={styles.summaryLabel}
                  />
                  <Label
                     text={toCurrency(
                        list
                           .map((x) => x.totalAmount)
                           .reduce((p, c) => p + c, 0)
                     )}
                     type="regular"
                  />
               </View>
            </SummaryView>
         </Container>
         <ConfirmDialog
            visible={incomeToDelete !== undefined}
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
      </Page>
   );
};

export default BudgetIncomesList;
