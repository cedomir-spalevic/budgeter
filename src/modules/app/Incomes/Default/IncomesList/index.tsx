import React, { useState } from "react";
import {
   Page,
   Container,
   ActionList,
   ActionItem,
   Searchbox,
   Label,
   Progress
} from "components";
import { makeStyles, useTheme } from "context";
import { useUser } from "context/User";
import { useIncomes } from "context/Incomes";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";
import { Income } from "services/models/data/income";
import IncomesRoutes from "../../routes";
import DeleteDialog from "../../../Shared/DeleteDialog";

const useStyles = makeStyles(() => ({
   loading: {
      paddingTop: 15
   }
}));

const IncomesList: React.FC = () => {
   const [searchValue, setSearchValue] = useState<string>();
   const [loading, setLoading] = useState<boolean>(false);
   const [incomeToDelete, setIncomeToDelete] = useState<Income>();
   const [deletingIncome, setDeletingIncome] = useState<boolean>(false);
   const incomes = useIncomes();
   const navigation = useNavigation();
   const theme = useTheme();
   const user = useUser();
   const styles = useStyles();

   const search = (sv?: string) => {
      setSearchValue(sv);
      incomes.get(sv);
   };

   const getNext = async () => {
      if (loading) return;
      setLoading(true);
      await incomes.get(searchValue, true);
      setLoading(false);
   };

   const deleteIncome = async () => {
      if (!incomeToDelete) return;
      setDeletingIncome(true);
      await incomes.delete(incomeToDelete.id);
      setIncomeToDelete(undefined);
      setDeletingIncome(false);
   };

   return (
      <Page>
         <Container
            title="Incomes"
            allowScroll
            fullWith
            onCloseToBottom={getNext}
         >
            <Container>
               <ActionItem title={<Label type="header" text="Incomes" />}>
                  <Searchbox placeholder="Search Incomes" onChange={search} />
               </ActionItem>
            </Container>
            <Container fullWith>
               <ActionList
                  items={incomes.values.map((x) => {
                     let swipeContentKey = "leftSwipeContent";
                     let actionReleaseKey = "onLeftActionRelease";
                     if (user.swipeOptions.deleteIncome === "right") {
                        swipeContentKey = "rightSwipeContent";
                        actionReleaseKey = "onRightActionRelease";
                     }

                     return {
                        id: x.id,
                        text: x.title,
                        note: { text: toCurrency(x.amount), color: "green" },
                        onPress: () =>
                           navigation.navigate(IncomesRoutes.Income, {
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
            {loading && (
               <View style={styles.loading}>
                  <Progress size="small" />
               </View>
            )}
         </Container>
         <DeleteDialog
            loading={deletingIncome}
            visible={incomeToDelete !== undefined}
            title={incomeToDelete ? incomeToDelete.title : ""}
            type="income"
            close={() => {
               setIncomeToDelete(undefined);
            }}
            delete={deleteIncome}
         />
      </Page>
   );
};

export default IncomesList;
