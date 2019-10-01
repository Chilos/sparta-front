import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService, UserInfo } from './auth.service';
import { HttpWrapperService } from './httpWraper.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpWrapperService, private auth: AuthService) { }

    public getCurrentUser(): Observable<UserInfo> {
        return this.http.get<UserInfo>(`${environment.SERVER_URL}/user/${this.auth.getTokenFromLocalStorage().userId}`);
    }
}