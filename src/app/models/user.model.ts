export interface User {
    name: string;
    avatar: string;
    id: string;
}

export interface AuthResponse {
    data: {
        user?: {
            user_metadata: {
                name: string;
                avatar_url: string;
            };
            id: string;
        };
    } | null;
    error: any;
}

export interface BalanceData {
    incomes: number;
    expenses: number;
}

export interface BalanceResponse {
    data: BalanceData | null;
    error: any;
}