export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: Date;
    role: string;
}


export interface LoginRes {
    user: User;
    token: string;
}