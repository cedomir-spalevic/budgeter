import { getItem, StorageKeys } from "services/internal/storage";
import { refresh } from "./api/apiFetch";

export const isAccessTokenValid = async (): Promise<void> => {
   const accessTokenExpiration = (await getItem(
      StorageKeys.AccessTokenExpiration
   )) as string;
   if (Date.now() - 500 > Number(accessTokenExpiration)) {
      refresh();
   }
};
