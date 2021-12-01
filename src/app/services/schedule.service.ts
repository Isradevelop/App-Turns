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

  // check all calendars
  getSchedules() {
    return this.http.get<Schedule[]>(`${this.baseUrl}/schedule`)
      .pipe(
        tap(resp => {
          this.router.navigateByUrl('/');
          return resp;
        }),
        catchError(err => of(err))
      );
  }



}
