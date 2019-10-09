import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { User } from '../shared/interfaces';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {


  public users: User[];
  private currentUser: User;
  public displayedColumns: string[] = ['username', 'realName', 'phoneNumber', 'role', 'action'];
  uSub: Subscription;
  constructor(
    private usersServise: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersServise.updateUser(result).subscribe((res) => {
          this.snackBar.open(`Данные пользователя ${res.username} были изменены.`, 'закрыть', { duration: 5000, verticalPosition: 'top' });
          this.refreshUsers();
        }, err => {
          this.snackBar.open(`Что-то пошло не так! `, 'закрыть', { duration: 5000, verticalPosition: 'top' });
        });
      }
    });
  }

  addNewUser() {
    const dialogRef = this.dialog.open(UserDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersServise.addUser(result).subscribe((res) => {
          this.snackBar.open(`Был добавлен пользователь с именем ${res.username}.`, 'закрыть', { duration: 5000, verticalPosition: 'top' });
          this.refreshUsers();
        }, err => {
          this.snackBar.open(`Что-то пошло не так! `, 'закрыть', { duration: 5000, verticalPosition: 'top' });
        });
      }
    });
  }

  removeUser(id: string) {
    this.usersServise.removeUser(id).subscribe((res) => {
      this.snackBar.open(`Пользователь с именем ${res.username} был удален.`, 'закрыть', { duration: 5000, verticalPosition: 'top' });
      this.refreshUsers();
    });
  }

  ngOnInit() {
    this.usersServise.getCurrentUser().subscribe((res) => {
      this.currentUser = res;
      this.refreshUsers();
    });
  }

  private refreshUsers() {
    this.uSub = this.usersServise.getAllUsers().subscribe(res => {
      this.users = res.filter(u => u.id !== this.currentUser.id);
    });
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

}
