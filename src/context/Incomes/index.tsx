import { useAuth } from "context";
import React, { useState, createContext, useContext } from "react";
import { Alert } from "react-native";
import { Income } from "services/external/api/models/data/income";
import { UnauthorizedError } from "services/external/api/models/errors";
import IncomesService from "services/external/api/incomes";

interface Props {
   children: React.ReactNode;
}

interface Context {
   values: Income[];
   get: () => Promise<void>;
   create: (income: Partial<Income>) => Promise<void>;
}

export const IncomesContext = createContext<Context>(undefined!);

const IncomesProvider: React.FC<Props> = (props: Props) => {
    const [values, setValues] = useState<Income[]>([]);
    const auth = useAuth();

    const get = async () => {
        try {
            const incomesService = IncomesService.getInstance();
            const incomes = await incomesService.get(5, 0);
            setValues([...incomes.values])
        }
        catch(error) {
            if(error instanceof UnauthorizedError) {
                auth.logout();
                return;
            }
            Alert.alert("Unable to get incomes", "We're having trouble getting your incomes at the moment.");
        }
    }

    const create = async (income: Partial<Income>) => {
        try {
            const incomesService = IncomesService.getInstance();
            const i = await incomesService.create(income);
            values.push(i)
            setValues([...values]);
        }
        catch(error) {
            console.log(error);
            if(error instanceof UnauthorizedError) {
                auth.logout();
                return;
            }
            Alert.alert("Unable to create Income", "We're having trouble creating your new income at the moment.");
        }
    }

    return (
        <IncomesContext.Provider value={{ values, get, create }}>
            {props.children}
        </IncomesContext.Provider>
    )
};

export const useIncomes = (): Context => useContext<Context>(IncomesContext);

export default IncomesProvider;