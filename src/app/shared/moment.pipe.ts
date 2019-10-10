
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'moment'
})
export class MomentPipe implements PipeTransform{
    transform(m: number, format: string = 'HH:mm'): any {
        return moment(new Date(m / 10000 - 2208988800000)).format(format);
    }
}