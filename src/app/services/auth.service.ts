import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoginResponse } from '../login-form/login-form.component';


export interface LoginPair {
    username: string;
    password: string;
}

export interface Response {
    id: string;
    token: string;
    tokenExpirationTime: number;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {}

    private fetchLogin(pair: LoginPair): Observable<Response> {
        return this.http.post<Response>(`${environment.SERVER_URL}/auth/login`, pair);
    }

    public login(login: string, password1: string): Observable<LoginResponse> {

        const pair: LoginPair = {
            username: login,
            password: password1
        };
        return = this.fetchLogin(pair).pipe(map(r=>r))
        

    }

    public logout() {
        localStorage.removeItem('token');
        console.log('remove token');
    }

    public isAuth(): boolean {
        return this.getTokenFromLocalStorage() ? true : false;
    }

    private setTokenToLocalStorage(token: string) {
        localStorage.setItem('token', token);
    }

    private getTokenFromLocalStorage(): string {
        return localStorage.getItem('token');
    }
}
