import gql from "graphql-tag";

export const incomesQuery = gql`
   query getIncomes($skip: Int, $limit: Int, $search: String) {
      incomes(skip: $skip, limit: $limit, search: $search) {
         id
         title
         amount
         initialDay
         initialDate
         initialMonth
         initialYear
         recurrence
         createdOn
         modifiedOn
      }
   }
`;

export const incomeByIdQuery = gql`
   query incomeById($id: ObjectID!) {
      incomeById(id: $id) {
         id
         title
         amount
         initialDay
         initialDate
         initialMonth
         initialYear
         recurrence
         createdOn
         modifiedOn
      }
   }
`;

export const createIncomeMutation = gql`
   mutation createIncome($income: IncomeInput) {
      createIncome(income: $income) {
         id
         title
         amount
         initialDay
         initialDate
         initialMonth
         initialYear
         recurrence
         createdOn
         modifiedOn
      }
   }
`;

export const updateIncomeMutation = gql`
   mutation updateIncome($id: ObjectID!, $income: IncomeInput) {
      updateIncome(id: $id, income: $income) {
         id
         title
         amount
         initialDay
         initialDate
         initialMonth
         initialYear
         recurrence
         createdOn
         modifiedOn
      }
   }
`;

export const deleteIncomeMutation = gql`
   mutation deleteIncome($id: ObjectID!) {
      deleteIncome(id: $id)
   }
`;
