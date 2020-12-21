import { User } from "./data";

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ListResponse<T> {
    count: number;
    values: T[];
}