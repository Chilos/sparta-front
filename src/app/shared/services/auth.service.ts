import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface LoginPair {
    username: string;
    password: string;

}

export interface Response {
    id: string;
    token: string;
    tokenExpirationTime: number;
    role: string;
    username: string;
}

export interface UserInfo {
    id: string;
    role: string;
    username: string;
    phoneNumber?: string;
}

export interface LocalStorageStore {
    token: string;
    userId: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {}

    public login(login: string, password: string): Observable<Response> {

        const pair: LoginPair = {
            username: login,
            password
        };
        return this.http.post<Response>(`${environment.SERVER_URL}/auth/login`, pair);
    }



    public logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userid');
    }

    public isAuth(): boolean {
        return localStorage.getItem('token') ? true : false;
    }

    public setTokenToLocalStorage(token: string, userid: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('userid', userid);
    }

    public getTokenFromLocalStorage(): LocalStorageStore {
        return {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userid'),
        };
    }
}
