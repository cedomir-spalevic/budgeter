import { User } from "./data";

export interface AuthResponse {
    token: string;
}

export interface ListResponse<T> {
    count: number;
    values: T[];
}