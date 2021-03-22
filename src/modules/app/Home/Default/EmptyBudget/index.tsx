import React from "react";
import { Page, Container, Label, Empty } from "components";
import { useBudgets } from "context/Budgets";

const EmptyBudget: React.FC = () => {
   const budgets = useBudgets();

   return (
      <Page>
         <Container flex>
            <Label type="header" text={budgets.title} />
            <Container flex verticallyCenter>
               <Empty
                  message="You have nothing in this budget, yet"
                  addCreateNew={false}
               />
            </Container>
         </Container>
      </Page>
   );
};

export default EmptyBudget;
