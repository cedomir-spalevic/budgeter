export interface User {
   firstName: string;
   lastName: string;
   email: string;
   isMfaVerified: boolean;
   createdOn: Date;
   modifiedOn: Date;
   device: {
      os: string | null;
   };
   notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
   incomeNotifications?: boolean;
   paymentNotifications?: boolean;
}

export interface UpdateUserBody {
   firstName: string;
   lastName: string;
   incomeNotifications: boolean;
   paymentNotifications: boolean;
}
