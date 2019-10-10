import { Component, OnInit } from '@angular/core';
import { WorkShift, WorkDaysPeriod } from '../shared/interfaces';
import { WorkShiftService } from '../shared/services/work-shift.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkShiftDialogComponent } from './work-shift-dialog/work-shift-dialog.component';

@Component({
  selector: 'app-options-page',
  templateUrl: './options-page.component.html',
  styleUrls: ['./options-page.component.scss']
})
export class OptionsPageComponent implements OnInit {

  public managerWorkShiftsWeekday: WorkShift[];
  public managerWorkShiftsWeekend: WorkShift[];
  public coachWorkShiftsWeekday: WorkShift[];
  public coachWorkShiftsWeekend: WorkShift[];

  public displayedColumns = ['name', 'period', 'action'];
  public dialogRef;
  constructor(
    private workShiftidServise: WorkShiftService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.refreshComponent();
  }

  private refreshComponent() {
    this.workShiftidServise.getAllWorkShifts().subscribe(res => {
      this.managerWorkShiftsWeekday = res.filter(r => r.role === 'manager' && r.workDaysPeriod === WorkDaysPeriod.Weekday);
      this.managerWorkShiftsWeekend = res.filter(r => r.role === 'manager' && r.workDaysPeriod === WorkDaysPeriod.Weekend);
      this.coachWorkShiftsWeekday = res.filter(r => r.role === 'coach' && r.workDaysPeriod === WorkDaysPeriod.Weekday);
      this.coachWorkShiftsWeekend = res.filter(r => r.role === 'coach' && r.workDaysPeriod === WorkDaysPeriod.Weekend);
    });

  }

  editWorkShift(workShift: WorkShift) {
    this.openDialog(workShift);

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.workShiftidServise.updateWorkShift(result).subscribe((res) => {
          this.snackBar.open(`Данные смены ${res.name} были изменены.`, 'закрыть', { duration: 5000, verticalPosition: 'top' });
        }, err => {
          this.snackBar.open(`Что-то пошло не так! `, 'закрыть', { duration: 5000, verticalPosition: 'top' });
        });
      }
    });
  }
  removeWorkShift(id: string) {
    this.workShiftidServise.removeWorkShift(id).subscribe((res) => {
      this.snackBar.open(`Смена ${res.name} была удалена.`, 'закрыть', { duration: 5000, verticalPosition: 'top' });
      this.refreshComponent();
    }, err => {
      this.snackBar.open(`Что-то пошло не так! `, 'закрыть', { duration: 5000, verticalPosition: 'top' });
    });
  }

  private addWorkShift(dialogResult) {
    if (dialogResult) {
      this.workShiftidServise.addWorkShift(dialogResult).subscribe((res) => {
        this.snackBar.open(`Данные смены ${res.name} были сохранены.`, 'закрыть', { duration: 5000, verticalPosition: 'top' });
        this.refreshComponent();
      }, err => {
        this.snackBar.open(`Что-то пошло не так! `, 'закрыть', { duration: 5000, verticalPosition: 'top' });
      });
    }
  }

  addWorkShiftManagerWeekday() {
    this.openDialog({ workDaysPeriod: WorkDaysPeriod.Weekday, role: 'manager' });

    this.dialogRef.afterClosed().subscribe(result => {
      this.addWorkShift(result);
    });
    
  }
  addWorkShiftManagerWeekend() {
    this.openDialog({ workDaysPeriod: WorkDaysPeriod.Weekend, role: 'manager' });
    this.dialogRef.afterClosed().subscribe(result => {
      this.addWorkShift(result);
    });
  }
  addWorkShiftcoachWeekday() {
    this.openDialog({ workDaysPeriod: WorkDaysPeriod.Weekday, role: 'coach' });
    this.dialogRef.afterClosed().subscribe(result => {
      this.addWorkShift(result);
    });
  }
  addWorkShiftcoachWeekend() {
    this.openDialog({ workDaysPeriod: WorkDaysPeriod.Weekend, role: 'coach' });
    this.dialogRef.afterClosed().subscribe(result => {
      this.addWorkShift(result);
    });
  }

  openDialog(shift: WorkShift | null) {
    this.dialogRef = this.dialog.open(WorkShiftDialogComponent, {
      data: shift,
    });
  }




}
