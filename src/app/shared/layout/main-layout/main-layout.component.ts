import { Component, OnInit } from '@angular/core';
import { AuthService, UserInfo } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


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

  public curretUser: UserInfo;

  constructor(private auth: AuthService, private router: Router) { }
  routeNavigation: RouteNavigatin[];
  ngOnInit() {
    this.auth.getCurrentUser().subscribe(res => {
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
