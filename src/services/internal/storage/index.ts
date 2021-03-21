import SecureStorage from "react-native-secure-storage";

export enum StorageKeys {
   AccessToken = "BudgeterAPIAccessToken",
   RefreshToken = "BudgeterAPIRefreshToken",
   AccessTokenExpiration = "BudgeterAPIAccessTokenExpiration",
   ConfirmationKey = "BudgeterAPIConfirmationKey",
   ConfirmationKeyExpiration = "BudgeterAPIConfirmationExpiration",
   DeleteIncomeSwipeOption = "BudgeterAPIDeleteIncomeSwipeOption",
   DeletePaymentSwipeOption = "BudgeterAPIDeletePaymentSwipeOption",
   Theme = "BudgeterTheme"
}

export const getItem = async (key: string): Promise<string> =>
   SecureStorage.getItem(key);

export const setItem = async (
   key: string,
   value: string | number
): Promise<void> => SecureStorage.setItem(key, value);

export const deleteItem = async (key: string): Promise<void> =>
   SecureStorage.setItem(key, "");

export const deleteAllStorageItems = async (): Promise<void> => {
   await Promise.all([
      await SecureStorage.setItem(StorageKeys.AccessToken, ""),
      await SecureStorage.setItem(StorageKeys.RefreshToken, ""),
      await SecureStorage.setItem(StorageKeys.AccessTokenExpiration, ""),
      await SecureStorage.setItem(StorageKeys.ConfirmationKey, ""),
      await SecureStorage.setItem(StorageKeys.ConfirmationKeyExpiration, "")
   ]);
};
