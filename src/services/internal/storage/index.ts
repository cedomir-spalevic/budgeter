import SecureStorage from "react-native-secure-storage";

export type SwipeOption = "left" | "right";

export enum StorageKeys {
    AccessToken = "BudgeterAPIAccessToken",
    RefreshToken = "BudgeterAPIRefreshToken",
    AccessTokenExpiration = "BudgeterAPIAccessTokenExpiration",
    ConfirmationKey = "BudgeterAPIConfirmationKey",
    ConfirmationKeyExpiration = "BudgeterAPIConfirmationExpiration",
    DeleteIncomeSwipeOption = "BudgeterAPIDeleteIncomeSwipeOption",
    DeletePaymentSwipeOption = "BudgeterAPIDeletePaymentSwipeOption"
}

export const getItem = async (key: string) => await SecureStorage.getItem(key);

export const setItem = async (key: string, value: any) => await SecureStorage.setItem(key, value);

export const deleteItem = async (key: string) => await SecureStorage.setItem(key, "");

export const deleteAllStorageItems = async () => {
    await Promise.all([
        await SecureStorage.setItem(StorageKeys.AccessToken, ""),
        await SecureStorage.setItem(StorageKeys.RefreshToken, ""),
        await SecureStorage.setItem(StorageKeys.AccessTokenExpiration, ""),
        await SecureStorage.setItem(StorageKeys.ConfirmationKey, ""),
        await SecureStorage.setItem(StorageKeys.ConfirmationKeyExpiration, "")
    ])
}