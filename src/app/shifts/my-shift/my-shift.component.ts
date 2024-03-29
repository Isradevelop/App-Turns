import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { ScheduleService } from '../../services/schedule.service';
import { AuthService } from '../../services/auth.service';
import { Token } from 'src/app/models/token.interface';
import { Schedule } from '../../models/schedule.interface';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-my-shift',
  templateUrl: './my-shift.component.html',
  styleUrls: ['./my-shift.component.css']
})
export class MyShiftComponent implements OnInit, OnDestroy {

  days: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  employeeName: string = '';
  employeeSchedules: any = [];
  employeeSchedule: any;
  currentWeek: number = moment().isoWeek();
  timerSubscription!: Subscription;


  constructor(private ScheduleService: ScheduleService) {




    this.timerSubscription = this.ScheduleService.getSchedules()
      .subscribe(data => {

        const employeeSchedulesService: any = data;

        const token: Token = jwt_decode(localStorage.getItem('token')!);

        this.employeeName = token.name;


        for (let schedule of employeeSchedulesService) {

          if (schedule.weekNumber === this.currentWeek && schedule.employeeName == this.employeeName) {

            this.employeeSchedule = schedule;

          }

        }

      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

}


