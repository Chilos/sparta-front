import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public display: boolean;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onCloseHandle() {
    console.log('Click', "clock");
  }

}
