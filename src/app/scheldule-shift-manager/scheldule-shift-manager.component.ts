import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-scheldule-shift-manager',
  templateUrl: './scheldule-shift-manager.component.html',
  styleUrls: ['./scheldule-shift-manager.component.scss']
})
export class SchelduleShiftManagerComponent implements OnInit {

  public displayedColumns = ['name', 'shift'];
  public schelduleShifts = [{ username: 'пользователь', shiftname: 'смена 1' }, { username: '', shiftname: 'смена 2' },
  { username: 'другой пользователь', shiftname: 'смена 1' }, { username: '', shiftname: 'смена 2' }];
  days = [];
  constructor() { }

  ngOnInit() {
    const startDay = moment().clone().startOf('month');
    const endDay = moment().clone().endOf('month');
    const date = startDay.clone().subtract(1, 'day');
    const d = [];
    while (date.isBefore(endDay, 'day')) {
      date.add(1, 'day');
      this.days.push({day: date.format('DD'), week: [date.locale('ru').format('dd')]});
      d.push(date.format('DD'));
    }
    console.log(d);
    console.log(this.days);
    console.log(startDay, endDay);
    this.displayedColumns = [...this.displayedColumns, ...d];
    this.schelduleShifts.forEach((item) => {
      this.days.forEach(element => {
        item[element.day] = false;
      });

    });

  }

  log(item, day) {
    item[day.day] = !item[day.day];
    console.log(item);
  }

}
