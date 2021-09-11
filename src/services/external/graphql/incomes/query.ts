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
`

export const incomeByIdQuery = gql`
   query getIncomesById($id: ObjectID!) {
      incomesById(id: $id) {
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
`

export const createIncomeMutation = gql`
   mutation createIncomes($income: IncomesInput) {
      createIncomes(income: $income) {
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
`

export const updateIncomeMutation = gql`
   mutation updateIncomes($id: ObjectID!, $income: IncomesInput) {
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
`

export const deleteIncomeMutation = gql`
   mutation deleteIncomes($id: ObjectID!) {
      deleteIncome(id: $id)
   }
`