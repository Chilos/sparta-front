import { Time } from '@angular/common';
import { Moment } from 'moment';

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
    role: 'admin' | 'coach' | 'groupCoach' | 'manager' | 'user';
}

export interface EditUser {
    id?: string;
    username: string;
    realName: string;
    phoneNumber?: string;
    role: 'admin' | 'coach' | 'groupCoach' | 'manager' | 'user';
    isDropPassword: boolean;
}

export interface AuthResponse {
    id: string;
    username: string;
    role: 'admin' | 'coach' | 'groupCoach' | 'manager' | 'user';
    needChangePassword: boolean;
    token: string;
    tokenExpirationTime: number;
}

export interface WorkShift {
    id?: string;
    name?: string;
    role: string;
    beginTime?: Date;
    endTime?: Date;
    workDaysPeriod: WorkDaysPeriod;
}

export enum WorkDaysPeriod {
    Weekday,
    Weekend
}
