import React, { useCallback, useEffect, useState } from "react";
import {
   Page,
   Container,
   ActionList,
   ActionItem,
   Searchbox,
   Label,
   SummaryView
} from "components";
import { makeStyles, useTheme, useUser } from "context";
import { useIncomes } from "context/Incomes";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { BudgetIncome } from "services/models/data/income";
import HomeRoutes from "../routes";
import DeleteDialog from "modules/app/Shared/DeleteDialog";

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
   const [deletingIncome, setDeletingIncome] = useState<boolean>(false);
   const budgets = useBudgets();
   const incomes = useIncomes();
   const navigation = useNavigation();
   const theme = useTheme();
   const user = useUser();
   const styles = useStyles();
   const setBudgetIncomes = useCallback(() => {
      setList([...budgets.value.incomes]);
   }, [budgets.value.incomes]);

   const onSearch = (searchValue: string | undefined) => {
      const normalizedValue = searchValue
         ? searchValue.trim().toLowerCase()
         : "";
      const filteredList = budgets.value.incomes.filter((x) =>
         x.title.trim().toLowerCase().includes(normalizedValue)
      );
      setList([...filteredList]);
   };

   const deleteIncome = async () => {
      setDeletingIncome(true);
      await incomes.delete(incomeToDelete!.id);
      setIncomeToDelete(undefined);
      setDeletingIncome(false);
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
         <DeleteDialog 
            loading={deletingIncome}
            visible={incomeToDelete !== undefined}
            title={incomeToDelete ? incomeToDelete.title : ""}
            type={"payment"}
            close={() => {
               setIncomeToDelete(undefined);
            }}
            delete={deleteIncome}
         />
      </Page>
   );
};

export default BudgetIncomesList;
