export interface BudgetPayment {
   paymentId: string;
   completed: boolean;
}

export interface Budget {
   budgetId?: string;
   name: string;
   startDate: Date;
   endDate: Date;
   completed: boolean;
   payments?: BudgetPayment[];
}

export interface BudgetResponse {
   valid: boolean;
   budgetId?: string;
   nameError?: string;
   startDateError?: string;
   endDateError?: string;
   totalError?: string;
}

export interface Payment {
   paymentId?: string;
   name: string;
   amount: number;
   dueDate?: Date;
}

export interface PaymentResponse {
   valid?: boolean;
   paymentId?: string;
   nameError?: string;
   amountError?: string;
   dueDateError?: string;
   totalError?: string;
}