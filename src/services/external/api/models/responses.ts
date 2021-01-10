export interface ConfirmationCodeResponse {
    key: string;
}

export interface AuthResponse {
    token: string;
}

export interface ListResponse<T> {
    count: number;
    values: T[];
}