import { Component, OnInit, Inject } from '@angular/core';
import { Time } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/users-page/user-dialog/user-dialog.component';
import { WorkShift } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-work-shift-dialog',
  templateUrl: './work-shift-dialog.component.html',
  styleUrls: ['./work-shift-dialog.component.scss']
})
export class WorkShiftDialogComponent implements OnInit {

  public header: string;
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: WorkShift | null) { }

  ngOnInit() {
    if (this.data.id) {
      this.header = 'Редактирование смены ' + this.data.name;
    } else {
      this.header = 'Добавление смены';
    }
    this.form = new FormGroup({
      name: new FormControl(this.data.name ? this.data.name : null, [Validators.required]),
      beginTime: new FormControl(this.data.beginTime ? this.data.beginTime : null),
      endTime: new FormControl(this.data.endTime ? this.data.endTime : null),
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  private timestringToDate(timestr: string): Date {
    const bdat = new Date();
    const time = timestr.split(/\:|\-/g);
    bdat.setHours(+time[0]);
    bdat.setMinutes(+time[1]);
    return bdat;
  }

  submit() {
    const shift: WorkShift = {
      id: this.data.id,
      name: this.form.value.name,
      beginTime: this.timestringToDate(this.form.value.beginTime),
      endTime: this.timestringToDate(this.form.value.endTime),
      role: this.data.role,
      workDaysPeriod: this.data.workDaysPeriod
    };
    console.log(shift);
    console.log(this.form);
    this.dialogRef.close(shift);
  }

}
