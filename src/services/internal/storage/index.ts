import SecureStorage from "react-native-secure-storage";

export enum StorageKeys {
    AccessToken = "BudgeterAPIKey",
    ConfirmationKey = "BudgeterAPIConfirmationKey"
}

export const getItem = async (key: string) => await SecureStorage.getItem(key);

export const setItem = async (key: string, value: any) => await SecureStorage.setItem(key, value);

export const deleteItem = async (key: string) => await SecureStorage.setItem(key, "");