import React, { useCallback, useEffect, useState } from "react";
import { useUser } from "context/User";
import { useIncomes } from "context/Incomes";
import { usePayments } from "context/Payments";
import { useBudgets } from "context/Budgets";
import { Container, Page, Progress } from "components";
import { useNavigation } from "@react-navigation/native";
import AppRoutes from "../routes";

const AppLoader: React.FC = () => {
   const [isLoaded, setIsLoaded] = useState<boolean>(false);
   const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
   const [isBudgetLoaded, setIsBudgetLoaded] = useState<boolean>(false);
   const [isIncomesLoaded, setIsIncomesLoaded] = useState<boolean>(false);
   const [isPaymentsLoaded, setIsPaymentsLoaded] = useState<boolean>(false);
   const user = useUser();
   const incomes = useIncomes();
   const payments = usePayments();
   const budgets = useBudgets();
   const navigation = useNavigation();

   const loadUser = async () => {
      try {
         if (isUserLoaded) return;
         await user.getUser();
         setIsUserLoaded(true);
      } catch (error) {}
   };

   const loadBudgets = async () => {
      try {
         if (isBudgetLoaded) return;
         await budgets.get();
         setIsBudgetLoaded(true);
      } catch (error) {}
   };

   const loadIncomes = async () => {
      try {
         if (isIncomesLoaded) return;
         await incomes.get();
         setIsIncomesLoaded(true);
      } catch (error) {}
   };

   const loadPayments = async () => {
      try {
         if (isPaymentsLoaded) return;
         await payments.get();
         setIsPaymentsLoaded(true);
      } catch (error) {}
   };

   const load = useCallback(async () => {
      try {
         /** Any app wide data load should go here */
         if (isLoaded) return;
         await Promise.all([
            await loadUser(),
            await loadBudgets(),
            await loadIncomes(),
            await loadPayments()
         ]);
         setIsLoaded(true);
         navigation.navigate(AppRoutes.App);
      } catch (error) {}
   }, [loadUser, loadBudgets, loadIncomes, loadPayments, navigation, isLoaded]);

   useEffect(() => {
      load();
   }, [load]);

   return (
      <Page>
         <Container flex verticallyCenter>
            <Progress size="large" />
         </Container>
      </Page>
   );
};

export default AppLoader;
