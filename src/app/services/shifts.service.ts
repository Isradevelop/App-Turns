import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shift } from '../models/shift.interface';
import { environment } from '../../environments/environment.prod';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthResponse } from '../models/authResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  // consulta los turnos disponibles
  allShifts() {
    return this.http.get<Shift[]>(`${this.baseUrl}/shift`);
  }


  //creación de turnos
  createShift(name: string, shift: string) {

    let shiftCreated: Shift = { name, shift };
    console.log('service', shiftCreated);

    return this.http.post<Shift>(`${this.baseUrl}/shift`, shiftCreated)
      .pipe(
        catchError(err => of(err.error))
      )
      ;
  }


  //borrado de turnos
  deleteShift(id: string) {
    return this.http.delete<AuthResponse>(`${this.baseUrl}/shift/${id}`);
  }
}
