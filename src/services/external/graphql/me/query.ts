import gql from "graphql-tag";

export const meQuery = gql`
   query {
      me {
         firstName
         lastName
         email
         phoneNumber
         isMfaVerified
         createdOn
         modifiedOn
         device {
               os
         }
         notificationPreferences {
               incomeNotifications
               paymentNotifications
         }
      }
   }
`

export const updateMeMutation = gql`
   mutation updateMe($me: MeInput) {
    updateMe(me: $me) {
        firstName
        lastName
        email
        phoneNumber
        isMfaVerified
        createdOn
        modifiedOn
        device {
            os
        }
        notificationPreferences {
            incomeNotifications
            paymentNotifications
        }
    }
}
`