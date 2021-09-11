import gql from "graphql-tag";

export const budgetQuery = gql`
   query getBudget($date: Int, $month: Int, $year: Int) {
      budget(date: $date, month: $month, year: $year) {
         incomes {
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
            dueToday
            totalAmount
            numberOfOccurrences
         }
         payments {
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
            dueToday
            totalAmount
            numberOfOccurrences
         }
      }
   }
`