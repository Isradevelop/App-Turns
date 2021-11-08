import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  constructor(private http: HttpClient) { }

  allShifts() {
    return this.http.get('mock/shifts.json');

  }
}
