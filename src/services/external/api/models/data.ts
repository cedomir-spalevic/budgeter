export interface User { 
    firstName: string;
    lastName: string;
    email: string;
    createdOn: Date;
    modifiedOn: Date;
}

export interface Budget {
    name: string;
    startDate: Date;
    endDate: Date;
    completed: boolean;
    createdOn: Date;
    modifiedOn: Date;
    payments: BudgetPayment[];
    _id: string;
}

export interface BudgetPayment {
    paymentId: string;
    completed: boolean;
}

export interface Payment {
    name: string;
    dueDate: Date;
    amount: number;
    createdOn: Date;
    modifiedOn: Date;
    _id: string;
}

export type ChallengeType = "emailVerification" | "passwordReset";