import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


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
    phoneNumber: string;
}

export interface LocalStorageStore {
    token: string;
    userId: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public userInfo: UserInfo;

    constructor(private http: HttpClient) {}

    public login(login: string, password1: string): Observable<Response> {

        const pair: LoginPair = {
            username: login,
            password: password1
        };
        return this.http.post<Response>(`${environment.SERVER_URL}/auth/login`, pair);
    }

    public getCurrentUser(): Observable<UserInfo> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'access_token': this.getTokenFromLocalStorage().token,
            })};
        return this.http.get<UserInfo>(`${environment.SERVER_URL}/user/${this.getTokenFromLocalStorage().userId}`, httpOptions);
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

    private getTokenFromLocalStorage(): LocalStorageStore {
        return {
            token: localStorage.getItem('token'),
            userId: localStorage.getItem('userid'),
        };
    }
}
