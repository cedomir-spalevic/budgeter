import { BudgetIncome } from "./income";
import { BudgetPayment } from "./payment";

export interface Budget {
   incomes: BudgetIncome[];
   payments: BudgetPayment[];
}

export interface DueTodayItem {
   type: "payment" | "income";
   item: BudgetIncome | BudgetPayment;
}
