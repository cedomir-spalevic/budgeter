export interface ConfirmationCodeResponse {
   expires: number;
   key: string;
}

export interface AuthResponse {
   expires: number;
   accessToken: string;
   refreshToken: string;
}

export interface ListResponse<T> {
   count: number;
   values: T[];
}
