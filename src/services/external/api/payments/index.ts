import { Payment, PaymentResponse } from "../models";
import ApiConfig from "../config";

class PaymentsService {
   private resource: string;
   static instance: PaymentsService;

   constructor() {
      this.resource = "payments";
   }

   static getInstance(): PaymentsService {
      if(!PaymentsService.instance)
         PaymentsService.instance = new PaymentsService();
      return PaymentsService.instance;
   }

   public async getPayments(): Promise<Payment[]> {
      const apiConfig = ApiConfig.getInstance();
      const response = await apiConfig.callApiProtected(this.resource);
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
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(payment)
      };
      const response = await apiConfig.callApiProtected(this.resource, options);
      return await response.json() as PaymentResponse;
   }

   public async updatePayment(payment: Payment): Promise<PaymentResponse> {
      const apiConfig = ApiConfig.getInstance();
      let updatedPayment = { ...payment };
      updatedPayment.paymentId = undefined;
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(updatedPayment)
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${payment.paymentId}`, options);
      return await response.json() as PaymentResponse;
   }

   public async deletePayment(paymentId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "DELETE"
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${paymentId}`, options);
      if (response.status !== 200)
         throw "Unable to delete Payment";
   }
}

export default {
   getInstance: () => PaymentsService.getInstance()
}