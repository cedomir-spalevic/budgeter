import { Recurrence } from "./recurrence";

export interface Income {
    id: string;
    title: string;
    amount: number;
    initialDay: number;
    initialMonth: number;
    initialYear: number;
    recurrence: Recurrence;
    createdOn: Date;
    modifiedOn: Date;
}

export interface BudgetIncome {
    id: string;
    title: string;
    amount: number;
    dueToday: boolean;
    totalAmount: number;
}