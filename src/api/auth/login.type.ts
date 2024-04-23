export interface UserItem {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    role: string;
}

export interface LoginResponse {
    user: UserItem;
    jwt: string;
}