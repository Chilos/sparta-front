import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface LoginResponse {
  success: boolean;
  error?: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.isAuth()) {
        this.router.navigate(['/']);
    }
    this.form = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submit() {
    const {login, password } = this.form.value;
    this.auth.login(login, password).subscribe(res => {

      this.auth.setTokenToLocalStorage(res.token);
      this.router.navigate(['/']);
     }, err => {
       console.error("AUTH_ERROR", err.error);
      });
  }

}
