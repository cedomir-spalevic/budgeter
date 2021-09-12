import React, { useCallback, useEffect, useState } from "react";
import {
   Page,
   Container,
   Spacer,
   SummaryView,
   Label
} from "components";
import { makeStyles, useTheme } from "context";
import { useBudgets } from "context/Budgets";
import { PlaygroundItem } from "./item";
import PlaygroundList from "./PlaygroundList";
import { View } from "react-native";
import { toCurrency } from "services/internal/currency";

const useStyles = makeStyles(() => ({
   summaryView: {
      flexDirection: "row"
   },
   summaryLabel: {
      paddingRight: 5
   }
}));

const Playground: React.FC = () => {
   const styles = useStyles();
   const theme = useTheme();
   const budgets = useBudgets();
   const [incomes, setIncomes] = useState<PlaygroundItem[]>([]);
   const [payments, setPayments] = useState<PlaygroundItem[]>([]);
   const total = useCallback(() => {
      const totalIncomes = incomes.reduce((total, i) => i.amount + total, 0)
      const totalPayments = payments.reduce((total, p) => p.amount + total, 0)
      return totalIncomes - totalPayments
   }, [incomes, payments])

   const addIncome = () => {
      incomes.push({
         id: Math.random().toString(),
         title: "New income",
         amount: 0
      })
      setIncomes([...incomes])
   }

   const updateIncome = (id: string, input: Partial<PlaygroundItem>) => {
      const index = incomes.findIndex((x) => x.id === id);
      if (index === -1) return false;
      const item = incomes[index];
      if(input.amount !== undefined && item.amount !== input.amount) item.amount = input.amount;
      if(input.title !== undefined && item.title !== input.title) item.title = input.title;
      incomes[index] = item;
      setIncomes([...incomes]);
   }

   const removeIncome = (id: string) => {
      const index = incomes.findIndex((x) => x.id === id);
      if (index === -1) return;
      incomes.splice(index, 1);
      setIncomes([...incomes]);
   }

   const addPayment = () => {
      payments.push({
         id: Math.random().toString(),
         title: "New payment",
         amount: 0
      })
      setPayments([...payments])
   }

   const updatePayment = (id: string, input: Partial<PlaygroundItem>) => {
      const index = payments.findIndex((x) => x.id === id);
      if (index === -1) return false;
      const item = payments[index];
      if(input.amount !== undefined && item.amount !== input.amount) item.amount = input.amount;
      if(input.title !== undefined && item.title !== input.title) item.title = input.title;
      payments[index] = item;
      setPayments([...payments]);
   }

   const removePayment = (id: string) => {
      const index = payments.findIndex((x) => x.id === id);
      if (index === -1) return;
      payments.splice(index, 1);
      setPayments([...payments]);
   }

   useEffect(() => {
      const initialIncomes: PlaygroundItem[] = budgets.value.incomes.map(x => ({
         id: x.id,
         title: x.title,
         amount: x.amount
      }))
      const initialPayments: PlaygroundItem[] = budgets.value.payments.map(x => ({
         id: x.id,
         title: x.title,
         amount: x.amount
      }))
      setIncomes([...initialIncomes])
      setPayments([...initialPayments])
   }, []);

   return (
      <Page>
         <Container title="Playground" marginBottom={300} flex allowScroll fullWith>
            <PlaygroundList
               title="Incomes"
               items={incomes}
               addNew={addIncome}
               updateItem={updateIncome}
               removeItem={removeIncome}
            />
            <Spacer />
            <PlaygroundList
               title="Payments"
               items={payments}
               addNew={addPayment}
               updateItem={updatePayment}
               removeItem={removePayment}
            />
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
                     text={toCurrency(total())}
                     type="regular"
                  />
               </View>
            </SummaryView>
         </Container>
      </Page>
   );
};

export default Playground;
