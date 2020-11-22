import { Payment, PaymentResponse } from "../models";
import config from "../";

export default class PaymentsService {
   private resource: string;
   private token: string;
   constructor(token) {
      this.resource = "payments";
      this.token = token;
   }

   public async getPayments(): Promise<Payment[]> {
      const url = `${config.budgeterApiUrl}${this.resource}`;
      const options: RequestInit = {
         headers: {
            "Authorization": `Bearer ${this.token}`
         }
      };
      const response = await fetch(url, options);
      if (response.status !== 200)
         throw "Unable to get Payments";

      const payments = await response.json() as any[];
      return payments.map(x => ({
         paymentId: x.paymentId,
         name: x.name,
         amount: x.amount,
         dueDate: x.dueDate ? new Date(x.dueDate) : undefined
      }))
   }

   public async createPayment(payment: Payment): Promise<PaymentResponse> {
      const url = `${config.budgeterApiUrl}${this.resource}`;
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
         },
         body: JSON.stringify(payment)
      };
      const response = await fetch(url, options);
      return await response.json() as PaymentResponse;
   }

   public async updatePayment(payment: Payment): Promise<PaymentResponse> {
      const url = `${config.budgeterApiUrl}${this.resource}/${payment.paymentId}`;
      let updatedPayment = { ...payment };
      updatedPayment.paymentId = undefined;
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.token}`
         },
         body: JSON.stringify(updatedPayment)
      };
      const response = await fetch(url, options);
      return await response.json() as PaymentResponse;
   }

   public async deletePayment(paymentId: string): Promise<void> {
      const url = `${config.budgeterApiUrl}${this.resource}/${paymentId}`;
      const options: RequestInit = {
         method: "DELETE",
         headers: {
            "Authorization": `Bearer ${this.token}`
         }
      };
      const response = await fetch(url, options);
      if (response.status !== 200)
         throw "Unable to delete Payment";
   }
}