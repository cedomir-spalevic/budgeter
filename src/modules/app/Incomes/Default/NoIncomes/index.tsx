import React from "react";
import { Page, Container, Label, Empty } from "components";

const NoIncomes: React.FC = () => (
   <Page>
      <Container flex>
         <Label type="header" text="Incomes" />
         <Container flex verticallyCenter>
            <Empty
               message="You have no incomes, yet"
               addCreateNew={false}
               onCreateNewClick={() => {}}
            />
         </Container>
      </Container>
   </Page>
);

export default NoIncomes;
