import { useAuth } from "context";
import React, { useState, createContext, useContext } from "react";
import { Alert } from "react-native";
import { Income } from "services/external/api/models/data/income";
import { UnauthorizedError } from "services/external/api/models/errors";
import IncomesService from "services/external/api/incomes";
import moment, { Moment } from "moment";

interface Props {
   children: React.ReactNode;
}

interface Context {
    date: Moment;
    getPrevious: () => void;
    getNext: () => void;
}

const BudgetContext = createContext<Context>(undefined!);

const BudgetsProvider: React.FC<Props> = (props: Props) => {
    const [date, setDate] = useState<Moment>(moment());

    const getPrevious = () => {
        date.set("month", date.get("month")-1);
        setDate(date);
    }

    const getNext = () => {
        date.set("month", date.get("month")+1);
        setDate(date);
    }

    return (
        <BudgetContext.Provider value={{ date, getPrevious, getNext }}>
            {props.children}
        </BudgetContext.Provider>
    )
};

export const useBudgets = (): Context => useContext<Context>(BudgetContext);

export default BudgetsProvider;