import { Component, OnInit, Inject } from '@angular/core';
import { User, EditUser } from 'src/app/shared/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  form: FormGroup;
  public header: string;
  constructor(public dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: User | null) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data === null) {
      this.header = 'Создание пользователя';
      this.form = new FormGroup({
        username: new FormControl(null, [Validators.required]),
        phoneNumber: new FormControl(null, [Validators.required]),
        role: new FormControl(null, [Validators.required]),
        isDropPassword: new FormControl(true)
      });
    } else {
      this.header = `Редактирование ${this.data.username}`;
      this.form = new FormGroup({
        username: new FormControl(this.data.username, [Validators.required]),
        phoneNumber: new FormControl(this.data.phoneNumber, [Validators.required]),
        role: new FormControl(this.data.role, [Validators.required]),
        isDropPassword: new FormControl(false)
      });
    }
  }
  onNoClick() {
    this.dialogRef.close();
  }

  submit() {
    const user: EditUser = {
      id: this.data ? this.data.id : null,
      username: this.form.value.username,
      phoneNumber: this.form.value.phoneNumber,
      role: this.form.value.role,
      isDropPassword: this.form.value.isDropPassword,
    };
    this.dialogRef.close(user);
  }

}
