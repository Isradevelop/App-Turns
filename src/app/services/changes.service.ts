import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Change } from '../models/change.interface';
import { environment } from '../../environments/environment.prod';
import { Schedule } from '../models/schedule.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChangesService {


  baseUrl = environment.baseURL;
  changesCopy: any = [];

  constructor(private http: HttpClient) { }

  //consulta todos los cambios por status
  getChanges(status: string) {
    return this.http.get(`${this.baseUrl}/change/${status}`);
  }

  //crea un nuevo cambio
  createChange(
    applicantEmployee: string,
    affectedEmployee: string,
    shiftApplicant: Schedule,
    shiftAffected: Schedule,
    changeDate: string,
    status: string
  ) {

    const changeCreated: Change = { applicantEmployee, affectedEmployee, shiftApplicant, shiftAffected, changeDate, status };

    return this.http.post<Change>(`${this.baseUrl}/change`, changeCreated)
      .pipe(
        catchError(err => of(err))
      );
  }

  //cambia el status del cambio
  //@params: id del cambio y nuevo status
  updateChange(_id: string, status: string, applicantSchedule?: Schedule, affectedSchedule?: Schedule, i?: number) {

    if (i) {
      return this.http.put<Change>(`${this.baseUrl}/change`, { _id, status, applicantSchedule, affectedSchedule, i });
    } else {
      return this.http.put<Change>(`${this.baseUrl}/change`, { _id, status });
    }

  }


}
