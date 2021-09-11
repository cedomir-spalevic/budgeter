import gql from "graphql-tag";

export const getBudgetsQuery = gql`
   query getBudgets($date: Int, $month: Int, $year: Int) {
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