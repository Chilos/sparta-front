import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { UsersService } from '../shared/services/users.service';
import { WorkShiftService } from '../shared/services/work-shift.service';
import { filter } from 'rxjs/operators';
import { WorkShift, WorkDaysPeriod } from '../shared/interfaces';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Subject } from 'rxjs';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-scheldule-shift-manager',
  templateUrl: './scheldule-shift-manager.component.html',
  styleUrls: ['./scheldule-shift-manager.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SchelduleShiftManagerComponent implements OnInit {

  public displayedColumns = ['name'];
  public schelduleShifts = [];
  date = new FormControl(moment());
  date$ = new Subject<moment.Moment>();

  public weekdayShifts: WorkShift[];
  public weekendShifts: WorkShift[];
  days = [];
  constructor(
    private userServise: UsersService,
    private workShifrServise: WorkShiftService
  ) { }

  ngOnInit() {
    this.workShifrServise.getAllWorkShifts().subscribe(res => {
      this.weekdayShifts = res.filter(w => w.role === 'manager' && w.workDaysPeriod === WorkDaysPeriod.Weekday);
      this.weekendShifts = res.filter(w => w.role === 'manager' && w.workDaysPeriod === WorkDaysPeriod.Weekend);
    });
    this.userServise.getAllUsers().subscribe(res => {
      res.filter(r => r.role === 'manager').forEach(r => {
        this.schelduleShifts.push({ username: r.realName });
      });

      const startDay = moment().clone().startOf('month');
      const endDay = moment().clone().endOf('month');
      const date = startDay.clone().subtract(1, 'day');
      const d = [];
      while (date.isBefore(endDay, 'day')) {
        date.add(1, 'day');
        this.days.push({
          day: date.format('DD'),
          week: [date.locale('ru').format('dd')],
          isWeekend: date.days() === 6 || date.days() === 0
        });
        d.push(date.format('DD'));
      }
      this.displayedColumns = [...this.displayedColumns, ...d];
      this.schelduleShifts.forEach((item) => {
        this.days.forEach(element => {
          item[element.day] = null;
        });
      });

      console.log(this.schelduleShifts);
    });
  }

  log(item, day, e) {
    item[day.day] = e ? e : null;
    console.log(item);
  }

  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

}
