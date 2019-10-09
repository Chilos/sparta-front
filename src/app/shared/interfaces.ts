export interface LoginUser {
    username: string;
    password: string;
    newPassword?: string;
}

export interface User {
    id?: string;
    username: string;
    realName: string;
    phoneNumber?: string;
    role: 'admin' | 'user';
}

export interface EditUser {
    id?: string;
    username: string;
    realName: string;
    phoneNumber?: string;
    role: 'admin' | 'user';
    isDropPassword: boolean;
}

export interface AuthResponse {
    id: string;
    username: string;
    role: 'admin' | 'user';
    needChangePassword: boolean;
    token: string;
    tokenExpirationTime: number;
}
