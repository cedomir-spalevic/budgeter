import { Recurrence } from "./recurrence";

export interface Income {
    id: string;
    title: string;
    amount: number;
    occurrenceDate: Date;
    recurrence: Recurrence;
    createdOn: Date;
    modifiedOn: Date;
}