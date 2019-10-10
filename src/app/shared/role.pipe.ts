import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'role'
})
export class RolePipe implements PipeTransform {
    transform(role: string): string {
        console.log(role);
        switch (role) {
            case 'admin': return 'Администратор';
            case 'coach': return 'Тренер';
            case 'groupCoach': return 'Тренеры';
            case 'user': return 'Пользователь';
            case 'manager': return 'Администратор-консультант';
        }
    }

}