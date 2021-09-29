import { User } from "services/models/data/user";
import { getClient } from "../client";
import { meQuery, updateMeMutation } from "./query";

const transformResponse = (user: User) => ({
   firstName: user.firstName,
   lastName: user.lastName,
   email: user.email,
   isMfaVerified: user.isMfaVerified,
   createdOn: new Date(user.createdOn),
   modifiedOn: new Date(user.modifiedOn),
   device: {
      os: user.device.os
   },
   notificationPreferences: {
      paymentNotifications: user.notificationPreferences.paymentNotifications,
      incomeNotifications: user.notificationPreferences.incomeNotifications
   }
});

export const getMe = async (): Promise<User> => {
   const client = getClient();
   const result = await client.query({
      query: meQuery,
      variables: {}
   });
   const me = result.data.me as User;
   return transformResponse(me);
};

export const updateMe = async (input: Partial<User>): Promise<User> => {
   const client = getClient();
   const result = await client.mutate({
      mutation: updateMeMutation,
      variables: {
         me: input
      }
   });
   const me = result.data.updateMe as User;
   return transformResponse(me);
};
