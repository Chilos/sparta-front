import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginUser, AuthResponse } from '../interfaces';
import { environment } from 'src/environments/environment.prod';
import { Observable, throwError, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) { }

    get token(): string {
        const expDate = new Date(localStorage.getItem('api-exptime-token'));
        if (expDate < new Date()) {
            this.logout();
            return null;
        }
        return localStorage.getItem('api-token');
    }

    login(user: LoginUser): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${environment.SERVER_URL}/auth/login`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            );
    }

    private handleError(error: HttpErrorResponse) {
        const { error_code } = error.error;

        switch (error_code) {
            case 'USER_NOT_FOUND':
                this.error$.next('USER_NOT_FOUND');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('INVALID_PASSWORD');
                break;
            case 'CHANGE_PASSWORD':
                this.error$.next('CHANGE_PASSWORD');
                break;
        }

        return throwError(error);
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    private setToken(response: AuthResponse | null) {
        if (response) {
            const expDate = new Date(new Date().getTime() + +response.tokenExpirationTime * 1000);
            localStorage.setItem('api-token', response.token);
            localStorage.setItem('api-exptime-token', expDate.toString());
            localStorage.setItem('curent-user-id', response.id);
        } else {
            localStorage.clear();
        }

    }
}
