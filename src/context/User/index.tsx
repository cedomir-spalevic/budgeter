import React, { createContext, useContext, useState } from "react";
import { User } from "services/external/api/models/data/user";
import UserService from "services/external/api/me";
import { Alert } from "react-native";

interface Props {
   children: React.ReactNode;
}

interface Context {
    value: User;
    getUser: () => Promise<void>;
}

export const UserContext = createContext<Context>(undefined!);

const UserProvider: React.FC<Props & any> = (props: Props) => {
    const [value, setValue] = useState<User>(undefined!);

    const getUser = async () => {
        try {
            const userService  = UserService.getInstance();
            const user = await userService.get();
            setValue(user);
        }
        catch(error) {
            Alert.alert("Unable to get user", "We're having trouble getting your user at the moment.");
        }
    }

    return (
        <UserContext.Provider value={{ value, getUser }}>
            {props.children}
        </UserContext.Provider>
    )
};

export const useUser = (): Context => useContext<Context>(UserContext);

export default UserProvider;