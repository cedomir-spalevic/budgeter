import gql from "graphql-tag";

export const paymentTagsQuery = gql`
   query getPaymentTags($skip: Int, $limit: Int) {
      paymentTags(skip: $skip, limit: $limit) {
         id
         tag
      }
   }
`