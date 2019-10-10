import { Injectable } from '@angular/core';
import { User, EditUser, WorkShift } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WorkShiftService {
    // TODO: Систематизировать ошибки которые тут могут происходить
    constructor(private http: HttpClient) { }

    public getAllWorkShifts(): Observable<WorkShift[]> {
        return this.http.get<WorkShift[]>(`${environment.SERVER_URL}/WorkShift/`);
    }

    public updateWorkShift(workShift: WorkShift): Observable<WorkShift> {
        return this.http.post<WorkShift>(`${environment.SERVER_URL}/WorkShift/update`, workShift);
    }

    public addWorkShift(workShift: WorkShift): Observable<WorkShift> {
        return this.http.post<WorkShift>(`${environment.SERVER_URL}/WorkShift/add`, workShift);
    }

    public removeWorkShift(workShiftid: string): Observable<WorkShift> {
        return this.http.get<WorkShift>(`${environment.SERVER_URL}/WorkShift/remove/${workShiftid}`);
    }
}
