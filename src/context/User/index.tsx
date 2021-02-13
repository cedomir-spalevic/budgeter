import React, { createContext, useContext, useState } from "react";
import { UpdateUserBody, User } from "services/external/api/models/data/user";
import UserService from "services/external/api/me";
import { Alert, Platform } from "react-native";
import { useAuth } from "context";
import { UnauthorizedError } from "services/external/api/models/errors";
import { getItem, setItem, StorageKeys } from "services/internal/storage";

export type SwipeOption = "left" | "right";

interface UserSwipeOptions {
    deleteIncome: SwipeOption;
    deletePayment: SwipeOption;
}

interface Props {
   children: React.ReactNode;
}

interface Context {
    value: User;
    swipeOptions: UserSwipeOptions;
    getUser: () => Promise<void>;
    update: (user: Partial<UpdateUserBody>) => Promise<void>;
    updateSwipeOptions: (swipeOptions: UserSwipeOptions) => Promise<void>;
}

const UserContext = createContext<Context>(undefined!);

const UserProvider: React.FC<Props & any> = (props: Props) => {
    const [value, setValue] = useState<User>(undefined!);
    const [swipeOptions, setSwipeOptions] = useState<UserSwipeOptions>(undefined!);
    const auth = useAuth();

    const getUser = async () => {
        try {
            const userService  = UserService.getInstance();
            const user = await userService.get();
            setValue(user);
        }
        catch(error) {
            if(error instanceof UnauthorizedError) {
                auth.logout();
                return;
            }
            Alert.alert("Unable to get user", "We're having trouble getting your user at the moment.");
        }
        finally {
            const deleteIncomeSwipeOption = await getItem(StorageKeys.DeleteIncomeSwipeOption);
            const deletePaymentSwipeOption = await getItem(StorageKeys.DeletePaymentSwipeOption);
            setSwipeOptions({
                deleteIncome: !deleteIncomeSwipeOption ? "left" : deleteIncomeSwipeOption,
                deletePayment: !deletePaymentSwipeOption ? "left" : deletePaymentSwipeOption
            })
        }
    }

    const update = async (user: Partial<User>) => {
        try {
            console.log(user);
            const userService  = UserService.getInstance();
            let updatedUser = await userService.update(user);
            setValue({...updatedUser});
        }
        catch(error) {
            console.log(error)
            if(error instanceof UnauthorizedError) {
                auth.logout();
                return;
            }
        }
    }

    const updateSwipeOptions = async (so: UserSwipeOptions) => {
        await setItem(StorageKeys.DeleteIncomeSwipeOption, so.deleteIncome);
        await setItem(StorageKeys.DeleteIncomeSwipeOption, so.deleteIncome);
        setSwipeOptions({
            deleteIncome: so.deleteIncome,
            deletePayment: so.deletePayment
        })
    }

    return (
        <UserContext.Provider value={{ swipeOptions, value, getUser, update, updateSwipeOptions }}>
            {props.children}
        </UserContext.Provider>
    )
};

export const useUser = (): Context => useContext<Context>(UserContext);

export default UserProvider;