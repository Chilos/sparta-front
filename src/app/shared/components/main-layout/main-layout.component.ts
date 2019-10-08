import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {


  public curentUser: User = {
    username: '',
    role: 'admin'
  };

  public routes;
  public currentRouteName;
  private cuSub: Subscription;
  constructor(
    private usersService: UsersService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    // Получаем текущего пользователя
    this.cuSub = this.usersService.getCurrentUser().subscribe(res => {
      this.curentUser = res;
    });

    // Задаем список переходов в зависимости от роли текущего пользователя
    // TODO: добавить разделение по ролям
    this.routes = [
      { link: ['/users'], name: 'Пользователи' },
      { link: ['/options'], name: 'Опции' },
    ];
  }

  ngOnDestroy() {
    if (this.cuSub) {
      this.cuSub.unsubscribe();
    }
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
