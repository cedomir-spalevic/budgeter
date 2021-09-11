import { PaymentTag } from "services/models/data/paymentTag";
import { getClient } from "../client";
import { paymentTagsQuery } from "./query";

export const getPaymentTags = async (limit: number, skip: number, search?: string): Promise<PaymentTag[]> => {
   const client = getClient();
   const result = await client.query({
      query: paymentTagsQuery,
      variables: {
         limit,
         skip,
         search
      }
   });
   const paymentTags = result.data.paymentTags as PaymentTag[];
   return paymentTags;
}