import React, { useState, createContext, useContext } from "react";
import { Payment } from "services/external/api/models/data";

interface Props {
   children: React.ReactNode;
}

interface Context {
   values: Payment[];
   get: () => Promise<void>;
   create: (payment: Partial<Payment>, budgetId?: string) => Promise<void>;
   update: (paymentId: string, payment: Partial<Payment>) => Promise<void>;
   delete: (paymentId: string) => Promise<void>;
}

export const PaymentsContext = createContext<Context>(undefined!);

const PaymentsProvider: React.FC<Props> = (props: Props) => {
    const [values, setValues] = useState<Payment[]>([]);

    const get = async () => {
    }

    const del = async (paymentId: string) => {
    }

    const create = async (payment: Partial<Payment>, budgetId: string) => {
    }

    const update = async (paymentId: string, payment: Partial<Payment>) => {
    }

    return (
        <PaymentsContext.Provider value={{ values, get, create, update, delete: del }}>
            {props.children}
        </PaymentsContext.Provider>
    )
};

export const usePayments = (): Context => useContext<Context>(PaymentsContext);

export default PaymentsProvider;