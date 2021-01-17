export interface User {
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    createdOn: Date;
    modifiedOn: Date;
    device: {
        os: string | null;
    }
}