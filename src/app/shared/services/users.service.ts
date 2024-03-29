import { Injectable } from '@angular/core';
import { User, EditUser } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    // TODO: Систематизировать ошибки которые тут могут происходить
    constructor(private http: HttpClient) { }

    public getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${environment.SERVER_URL}/user/${localStorage.getItem('curent-user-id')}`);
    }

    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.SERVER_URL}/user/users`);
    }

    public updateUser(user: EditUser): Observable<User> {
        return this.http.post<User>(`${environment.SERVER_URL}/user/update`, user);
    }

    public addUser(user: EditUser): Observable<User> {
        return this.http.post<User>(`${environment.SERVER_URL}/user/add`, user);
    }

    public removeUser(userid: string): Observable<User> {
        return this.http.get<User>(`${environment.SERVER_URL}/user/remove/${userid}`);
    }
}
