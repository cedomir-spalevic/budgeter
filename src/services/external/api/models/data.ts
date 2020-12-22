export interface User { 
    email: string;
    isAdmin: boolean;
    isService: boolean;
    createdOn: Date;
    modifiedOn: Date;
    _id: string;
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