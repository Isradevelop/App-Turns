import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../models/schedule.interface';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {



  constructor(private http: HttpClient) { }



  getSchedules() {

    return this.http.get('../mock/schedule.json');

  }



}
