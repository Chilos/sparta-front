import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public showNavbar: BehaviorSubject<boolean> = new BehaviorSubject(true);

    constructor(private http: HttpClient) {}

    
    public login(login: string, password1: string): Observable<Response> {

        const pair: LoginPair = {
            username: login,
            password: password1
        };
        return this.http.post<Response>(`${environment.SERVER_URL}/auth/login`, pair);
    }

    public logout() {
        this.showNavbar.next(false);
        localStorage.removeItem('token');
    }

    public isAuth(): boolean {
        return this.getTokenFromLocalStorage() ? true : false;
    }

    public setTokenToLocalStorage(token: string) {
        localStorage.setItem('token', token);
    }

    private getTokenFromLocalStorage(): string {
        return localStorage.getItem('token');
    }
}
