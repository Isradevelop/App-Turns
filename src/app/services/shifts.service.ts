import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthResponse } from '../models/authResponse.interface';
import { Shift } from '../models/shift.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  baseUrl = environment.baseURL;

  constructor(private http: HttpClient,
    private router: Router) { }

  // check the available shifts
  allShifts() {
    return this.http.get<Shift[]>(`${this.baseUrl}/shift`)
      .pipe(
        catchError(err => of(err.error))
      );
  }


  //shift creation
  createShift(name: string, shift: string) {

    let shiftCreated: Shift = { name, shift };
    console.log('service', shiftCreated);

    return this.http.post<Shift>(`${this.baseUrl}/shift`, shiftCreated)
      .pipe(
        tap(resp => this.router.navigateByUrl('/shifts/typesShifts')),
        catchError(err => of(err.error))
      );
  }


  //shift deletion
  deleteShift(id: string) {
    return this.http.delete<AuthResponse>(`${this.baseUrl}/shift/${id}`)
      .pipe(
        tap(resp => this.router.navigateByUrl('/shifts/typesShift')),
        catchError(err => of(err.error))
      );
  }
}
