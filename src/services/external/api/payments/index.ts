import { Payment } from "../models/data";
import ApiConfig from "../config";
import { GeneralError, InternalServerError, NotFoundError } from "../models/errors";
import { ListResponse } from "../models/responses";

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

   public async getPayments(limit: number, skip: number): Promise<ListResponse<Payment>> {
      const apiConfig = ApiConfig.getInstance();
      const url = `${this.resource}?limit=${limit}&skip=${skip}`
      const response = await apiConfig.callApiProtected(url);
      if(response.status === 400) {
         const body = await response.json();
         throw new GeneralError(body.message);
      }
      if(response.status === 500) {
         const body = await response.json();
         throw new InternalServerError(body.message);
      }
      const body = await response.json();
      return {
         count: body.count,
         values: body.values.map(x => ({
            _id: x._id,
            name: x.name,
            dueDate: new Date(x.dueDate),
            amount: x.amount,
            createdOn: new Date(x.createdOn),
            modifiedOn: new Date(x.modifiedOn)
         }))
      }
   }

   public async createPayment(payment: Partial<Payment>): Promise<Payment> {
      const apiConfig = ApiConfig.getInstance();
      let body = {
         name: payment.name,
         dueDate: payment.dueDate.toISOString(),
         amount: payment.amount
      }
      const options: RequestInit = {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(body)
      };
      const response = await apiConfig.callApiProtected(this.resource, options);
      const responseBody = await response.json();
      if(response.status === 400) {
         throw new GeneralError(responseBody.message);
      }
      if(response.status === 500) {
         throw new InternalServerError(responseBody.message);
      }
      return {
         _id: responseBody._id,
         name: responseBody.name,
         dueDate: new Date(responseBody.dueDate),
         amount: responseBody.amount,
         createdOn: new Date(responseBody.createdOn),
         modifiedOn: new Date(responseBody.modifiedOn)
      }
   }

   public async updatePayment(paymentId: string, payment: Partial<Payment>): Promise<Payment> {
      const apiConfig = ApiConfig.getInstance();
      let body = {
         name: payment.name,
         dueDate: payment.dueDate.toISOString(),
         amount: payment.amount
      }
      const options: RequestInit = {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(body)
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${paymentId}`, options);
      if(response.status === 400) {
         const responseBody = await response.json();
         throw new GeneralError(responseBody.message);
      }
      if(response.status === 404) {
         throw new NotFoundError();
      }
      if(response.status === 500) {
         const responseBody = await response.json();
         throw new InternalServerError(responseBody.message);
      }
      const responseBody = await response.json();
      return {
         _id: responseBody._id,
         name: responseBody.name,
         dueDate: new Date(responseBody.dueDate),
         amount: responseBody.amount,
         createdOn: new Date(responseBody.createdOn),
         modifiedOn: new Date(responseBody.modifiedOn)
      }
   }

   public async deletePayment(paymentId: string): Promise<void> {
      const apiConfig = ApiConfig.getInstance();
      const options: RequestInit = {
         method: "DELETE"
      };
      const response = await apiConfig.callApiProtected(`${this.resource}/${paymentId}`, options);
      if(response.status === 400) {
         const responseBody = await response.json();
         throw new GeneralError(responseBody.message);
      }
      if(response.status === 404) {
         throw new NotFoundError();
      }
      if(response.status === 500) {
         const responseBody = await response.json();
         throw new InternalServerError(responseBody.message);
      }
   }
}

export default {
   getInstance: () => PaymentsService.getInstance()
}