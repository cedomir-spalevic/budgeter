import React, { useCallback, useEffect, useState } from "react";
import {
   Page,
   Container,
   ActionList,
   Label,
   ConfirmDialog,
   Searchbox,
   ActionItem
} from "components";
import { useTheme, useUser } from "context";
import { useIncomes } from "context/Incomes";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import { toCurrency } from "services/internal/currency";
import { DueTodayItem } from "services/external/api/models/data/budget";
import HomeRoutes from "../routes";

const BudgetDueTodayList: React.FC = () => {
   const [list, setList] = useState<DueTodayItem[]>([]);
   const [itemToDelete, setItemToDelete] = useState<DueTodayItem>();
   const budgets = useBudgets();
   const incomes = useIncomes();
   const payments = usePayments();
   const navigation = useNavigation();
   const theme = useTheme();
   const user = useUser();
   const setBudgetValues = useCallback(() => {
      setList([
         ...budgets.value.incomes
            .filter((x) => x.dueToday)
            .map((x): DueTodayItem => ({ type: "income", item: x })),
         ...budgets.value.payments
            .filter((x) => x.dueToday)
            .map((x): DueTodayItem => ({ type: "payment", item: x }))
      ]);
   }, [budgets.value.incomes, budgets.value.payments]);

   const onSearch = (searchValue: string) => {
      const filteredList = [
         ...budgets.value.incomes
            .filter(
               (x) =>
                  x.dueToday &&
                  x.title
                     .trim()
                     .toLowerCase()
                     .includes(searchValue.trim().toLowerCase())
            )
            .map((x): DueTodayItem => ({ type: "income", item: x })),
         ...budgets.value.payments
            .filter(
               (x) =>
                  x.dueToday &&
                  x.title
                     .trim()
                     .toLowerCase()
                     .includes(searchValue.trim().toLowerCase())
            )
            .map((x): DueTodayItem => ({ type: "payment", item: x }))
      ];
      setList([...filteredList]);
   };

   const deleteItem = async () => {
      if (itemToDelete.type === "payment") {
         await payments.delete(itemToDelete.item.id);
         setItemToDelete(undefined);
      } else {
         await incomes.delete(itemToDelete.item.id);
         setItemToDelete(undefined);
      }
   };

   useEffect(() => {
      setBudgetValues();
   }, [setBudgetValues]);

   return (
      <Page>
         <Container title="Due Today" allowScroll fullWith>
            <Container>
               <ActionItem title={<Label type="header" text="Due Today" />}>
                  <Searchbox placeholder="Search items" onChange={onSearch} />
               </ActionItem>
            </Container>
            <Container fullWith>
               <ActionList
                  items={list.map((x) => {
                     let swipeContentKey = "leftSwipeContent";
                     let actionReleaseKey = "onLeftActionRelease";
                     if (
                        (x.type === "income" &&
                           user.swipeOptions.deleteIncome === "right") ||
                        (x.type === "payment" &&
                           user.swipeOptions.deletePayment === "right")
                     ) {
                        swipeContentKey = "rightSwipeContent";
                        actionReleaseKey = "onRightActionRelease";
                     }
                     return {
                        id: x.item.id,
                        text: x.item.title,
                        note: {
                           text: toCurrency(x.item.amount),
                           color: x.type === "income" ? "green" : "red"
                        },
                        onPress: () => {
                           if (x.type === "income")
                              navigation.navigate(HomeRoutes.Income, {
                                 income: x.item
                              });
                           else
                              navigation.navigate(HomeRoutes.Payment, {
                                 payment: x.item
                              });
                        },
                        [swipeContentKey]: {
                           color: theme.value.palette.red,
                           iconName: "delete"
                        },
                        [actionReleaseKey]: () => setItemToDelete(x)
                     };
                  })}
               />
            </Container>
         </Container>

         <ConfirmDialog
            visible={itemToDelete !== undefined}
            title={`Delete ${itemToDelete.item.title}?`}
            onTouchOutside={() => setItemToDelete(undefined)}
            message={`Are you sure want to delete this ${
               itemToDelete.type === "payment" ? "Payment" : "Income"
            }? This will be removed from all of your budgets.`}
            positiveButton={{
               title: "Yes",
               onPress: () => deleteItem()
            }}
            negativeButton={{
               title: "No",
               onPress: () => setItemToDelete(undefined)
            }}
         />
      </Page>
   );
};

export default BudgetDueTodayList;
