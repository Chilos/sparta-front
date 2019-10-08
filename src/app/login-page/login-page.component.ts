import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { LoginUser } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  submitted = false;
  needChangePassword = false;
  newPasswordHide = true;
  passwordHide = true;
  form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null)
    });
    this.auth.error$.subscribe(res => {
      switch (res) {
        case 'USER_NOT_FOUND':
          this.snackBar.open('Неверное имя пользователя.', 'закрыть', { duration: 5000, verticalPosition: 'top' });
          break;
        case 'INVALID_PASSWORD':
          this.snackBar.open('Неверный пароль.', 'закрыть', { duration: 5000, verticalPosition: 'top' });
          break;
        case 'CHANGE_PASSWORD':
          this.snackBar.open('Был выполнен сброс пароля. Укажите новый.', 'закрыть', { duration: 5000, verticalPosition: 'top' });
          this.form.controls.newPassword.setValidators([Validators.required, Validators.minLength(4)]);
          this.needChangePassword = true;
          break;
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    const user: LoginUser = {
      username: this.form.value.username,
      password: this.form.value.password,
      newPassword: this.form.value.newPassword
    };

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.submitted = false;
      this.router.navigate(['/users']);
    }, err => {
      this.submitted = false;
    });
  }

}
