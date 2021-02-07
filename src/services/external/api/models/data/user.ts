export interface User {
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    createdOn: Date;
    modifiedOn: Date;
    device: {
        os: string | null
    },
    notificationPreferences: {
       incomeNotifications: boolean;
       paymentNotifications: boolean;
    }
}

export interface UpdateUserBody {
    firstName: string;
    lastName: string;
    incomeNotifications: boolean;
    paymentNotifications: boolean;
}