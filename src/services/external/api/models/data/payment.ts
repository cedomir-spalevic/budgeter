import { Recurrence } from "./recurrence";

export interface Payment {
    id: string;
    title: string;
    amount: number;
    initialDay: number;
    initialDate: number;
    initialMonth: number;
    initialYear: number;
    recurrence: Recurrence;
    createdOn: Date;
    modifiedOn: Date;
}

export interface BudgetPayment extends Payment {
    dueToday: boolean;
    totalAmount: number;
    numberOfOccurrences: number;
}