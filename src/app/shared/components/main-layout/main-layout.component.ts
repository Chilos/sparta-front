import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public curentUser: User;
  public routes;
  public currentRouteName;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.curentUser = this.usersService.getCurrentUser();
    this.routes = [
      { link: ['/users'], name: 'Пользователи' },
      { link: ['/options'], name: 'Опции' },
    ];
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
