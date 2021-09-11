import React, { useCallback, useEffect, useState } from "react";
import {
   Page,
   Container,
   ActionList,
   Label,
   Searchbox,
   ActionItem
} from "components";
import { useTheme, useUser } from "context";
import { useIncomes } from "context/Incomes";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";
import { useNavigation } from "@react-navigation/native";
import { toCurrency } from "services/internal/currency";
import { DueTodayItem } from "services/models/data/budget";
import HomeRoutes from "../routes";
import DeleteDialog from "modules/app/Shared/DeleteDialog";

const BudgetDueTodayList: React.FC = () => {
   const [list, setList] = useState<DueTodayItem[]>([]);
   const [itemToDelete, setItemToDelete] = useState<DueTodayItem>();
   const [deletingItem, setDeletingItem] = useState<boolean>(false);
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

   const onSearch = (searchValue: string | undefined) => {
      const normalizedValue = searchValue
         ? searchValue.trim().toLowerCase()
         : "";
      const filteredList = [
         ...budgets.value.incomes
            .filter(
               (x) =>
                  x.dueToday &&
                  x.title.trim().toLowerCase().includes(normalizedValue)
            )
            .map((x): DueTodayItem => ({ type: "income", item: x })),
         ...budgets.value.payments
            .filter(
               (x) =>
                  x.dueToday &&
                  x.title.trim().toLowerCase().includes(normalizedValue)
            )
            .map((x): DueTodayItem => ({ type: "payment", item: x }))
      ];
      setList([...filteredList]);
   };

   const deleteItem = async () => {
      setDeletingItem(true);
      if (itemToDelete!.type === "payment") {
         await payments.delete(itemToDelete!.item.id);
         setItemToDelete(undefined);
      } else {
         await incomes.delete(itemToDelete!.item.id);
         setItemToDelete(undefined);
      }
      setDeletingItem(false);
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
         <DeleteDialog 
            loading={deletingItem}
            visible={itemToDelete !== undefined}
            title={itemToDelete ? itemToDelete.item.title : ""}
            type={itemToDelete?.type === "payment" ? "payment" : "income"}
            close={() => {
               setItemToDelete(undefined);
            }}
            delete={deleteItem}
         />
      </Page>
   );
};

export default BudgetDueTodayList;
