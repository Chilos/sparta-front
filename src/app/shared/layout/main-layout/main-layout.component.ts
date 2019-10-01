import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { UserInfo, AuthService } from 'src/app/services/auth.service';


export interface RouteNavigatin {
  name: string;
  link: string;
}

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public curretUser: UserInfo = {
    id: '',
    phoneNumber: '',
     role: '',
     username: ''
  };

  constructor(private users: UsersService, private router: Router, private auth: AuthService) { }

  routeNavigation: RouteNavigatin[];
  ngOnInit() {
    this.users.getCurrentUser().subscribe(res => {
      console.log('userInfo', res);
      this.curretUser = res;
      if (res.role === 'admin') {
      this.routeNavigation = [
        {name: 'Главная', link: '/home'},
        {name: 'Администрирование', link: '/admin'},
      ];
    }
    });
    this.router.navigateByUrl('home');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
