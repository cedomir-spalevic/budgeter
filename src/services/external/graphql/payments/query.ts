import gql from "graphql-tag";

export const paymentsQuery = gql`
   query getPayments($skip: Int, $limit: Int, $search: String) {
      payments(skip: $skip, limit: $limit, search: $search) {
         id
         title
         amount
         initialDay
         initialDate
         initialMonth
         initialYear
         endDay
         endDate
         endMonth
         endYear
         recurrence
         createdOn
         modifiedOn
         tags {
            id
            tag
         }
      }
   }
`;

export const paymentByIdQuery = gql`
   query getPaymentById($id: ObjectID!) {
      paymentById(id: $id) {
         id
         title
         amount
         initialDay
         initialDate
         initialMonth
         initialYear
         endDay
         endDate
         endMonth
         endYear
         recurrence
         createdOn
         modifiedOn
         tags {
            id
            tag
         }
      }
   }
`;

export const createPaymentMutation = gql`
   mutation createPayment($payment: PaymentInput) {
      createPayment(payment: $payment) {
         id
         title
         amount
         initialDay
         initialDate
         initialMonth
         initialYear
         endDay
         endDate
         endMonth
         endYear
         recurrence
         createdOn
         modifiedOn
         tags {
            id
            tag
         }
      }
   }
`;

export const updatePaymentMutation = gql`
   mutation updatePayment($id: ObjectID!, $payment: PaymentInput) {
      updatePayment(id: $id, payment: $payment) {
         id
         title
         amount
         initialDay
         initialDate
         initialMonth
         initialYear
         endDay
         endDate
         endMonth
         endYear
         recurrence
         createdOn
         modifiedOn
         tags {
            id
            tag
         }
      }
   }
`;

export const deletePaymentMutation = gql`
   mutation deletePayment($id: ObjectID!) {
      deletePayment(id: $id)
   }
`;
