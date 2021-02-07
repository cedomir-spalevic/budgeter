import { Recurrence } from "./recurrence";

export interface Income {
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

export interface BudgetIncome extends Income {
    dueToday: boolean;
    totalAmount: number;
}