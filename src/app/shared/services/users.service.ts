import { Injectable } from '@angular/core';
import { User } from '../interfaces';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor() { }

    public getCurrentUser(): User {
        return {
            id: '123',
            username: 'admin',
            phoneNumber: '88005553535',
            role: 'admin'
        };
    }
}
