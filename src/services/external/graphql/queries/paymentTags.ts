import gql from "graphql-tag";

export const getPaymentTagsQuery = gql`
   query getPaymentTags($skip: Int, $limit: Int) {
      paymentTags(skip: $skip, limit: $limit) {
         id
         tag
      }
   }
`