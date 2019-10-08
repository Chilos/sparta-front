import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) { }

    public getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${environment.SERVER_URL}/user/${localStorage.getItem('curent-user-id')}`);
    }
}
