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
    empty: boolean;
    values: Income[];
    get: (searchValue?: string) => Promise<void>;
    create: (income: Partial<Income>) => Promise<boolean>;
    update: (id: string, income: Partial<Income>) => Promise<boolean>;
    delete: (id: string) => Promise<boolean>;
}

const IncomesContext = createContext<Context>(undefined!);

const IncomesProvider: React.FC<Props> = (props: Props) => {
    const [empty, setEmpty] = useState<boolean>(false);
    const [values, setValues] = useState<Income[]>([]);
    const auth = useAuth();

    const get = async (search?: string) => {
        try {
            const incomesService = IncomesService.getInstance();
            const incomes = await incomesService.get(10, 0, search);
            setValues([...incomes.values]);
            setEmpty(!search && incomes.values.length === 0)
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
            if(values.length === 0)
                setEmpty(false);
            values.push(i)
            setValues([...values]);
            return true;
        }
        catch(error) {
            if(error instanceof UnauthorizedError) {
                auth.logout();
                return;
            }
            Alert.alert("Unable to create income", "We're having trouble creating your new income at the moment.");
            return false;
        }
    }

    const update = async (id: string, income: Partial<Income>) => {
        try {
            const index = values.findIndex(x => x.id === id);
            if(index === -1)
                return;
            const incomesService = IncomesService.getInstance();
            const i = await incomesService.update(id, income);
            values[index] = i;
            setValues([...values]);
            return true;
        }
        catch(error) {
            if(error instanceof UnauthorizedError) {
                auth.logout();
                return;
            }
            Alert.alert("Unable to create income", "We're having trouble creating your new income at the moment.");
            return false;
        }
    }

    const deleteIncome = async (id: string) => {
        try {
            const index = values.findIndex(x => x.id === id);
            if(index === -1)
                return;
            const incomesService = IncomesService.getInstance();
            await incomesService.delete(id);
            if(values.length === 0)
                setEmpty(true);
            values.splice(index, 1);
            setValues([...values]);
            return true;
        }
        catch(error) {
            if(error instanceof UnauthorizedError) {
                auth.logout();
                return;
            }
            Alert.alert("Unable to create income", "We're having trouble creating your new income at the moment.");
            return false;
        }
    }

    return (
        <IncomesContext.Provider value={{ empty, values, get, create, update, delete: deleteIncome }}>
            {props.children}
        </IncomesContext.Provider>
    )
};

export const useIncomes = (): Context => useContext<Context>(IncomesContext);

export default IncomesProvider;