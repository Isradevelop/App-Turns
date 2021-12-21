import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Schedule } from '../models/schedule.interface';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  baseUrl = environment.baseURL;

  constructor(private http: HttpClient,
    private router: Router) { }

  // check all schedules
  getSchedules() {
    return this.http.get<Schedule[]>(`${this.baseUrl}/schedule`)
      .pipe(
        tap(resp => {
          return resp;
        }),
        catchError(err => of(err))
      );
  }

  //create a new schedule
  createSchedule(employeeName: string, dates: string[], shifts: string[], year: string, month: string) {
    return this.http.post<Schedule>(`${this.baseUrl}/schedule/new`, { employeeName, dates, shifts, year, month })
      .pipe(
        tap(scheduleCreated => {
          return scheduleCreated;
        }),
        catchError(err => of(err))

      )

  }



}
