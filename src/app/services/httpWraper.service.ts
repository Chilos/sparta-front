import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class HttpWrapperService {

    constructor(private http: HttpClient, private auth: AuthService) { }

    public get<T>(url: string): Observable<T> {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'access_token': this.auth.getTokenFromLocalStorage().token,
            })};
        return this.http.get<T>(url, httpOptions);
    }
}