import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Change } from '../models/change.interface';
import { environment } from '../../environments/environment.prod';
import { Schedule } from '../models/schedule.interface';


@Injectable({
  providedIn: 'root'
})
export class ChangesService {


  baseUrl = environment.baseURL;
  changesCopy: any = [];

  constructor(private http: HttpClient,
    private router: Router,) { }

  //check all changes by status
  getChanges(status: string) {
    return this.http.get(`${this.baseUrl}/change/${status}`);
  }

  //create a new change
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

  //change the status of the change and makes the shift change
  //@params: change id and new status
  updateChange(_id: string, status: string, applicantSchedule?: Schedule, affectedSchedule?: Schedule, i?: number) {



    if (i) {
      return this.http.put<Change>(`${this.baseUrl}/change`, { _id, status, applicantSchedule, affectedSchedule, i })
        .pipe(
          tap(resp => this.router.navigateByUrl('/')),
          catchError(err => of(err))
        );
    } else {
      return this.http.put<Change>(`${this.baseUrl}/change`, { _id, status })
        .pipe(
          tap(resp => this.router.navigateByUrl('/')),
          catchError(err => of(err))
        );
    }

  }


}
