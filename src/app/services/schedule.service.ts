import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.interface';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }

  // todos los calendarios
  getSchedules() {
    return this.http.get<Schedule[]>(`${this.baseUrl}/schedule`);
  }



}
