import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  timerSubscription!: Subscription;


  constructor(private ScheduleService: ScheduleService) {

    let date: Date = new Date();
    let monthNumber: number = date.getUTCMonth() + 1;
    let dayNumber: number = date.getUTCDate();
    let dayAndMonth: string = dayNumber.toString() + "/" + monthNumber.toString();

    //format   d / mm   to   0d / mm
    if (dayNumber < 10 || monthNumber < 10) {
      let dayString: string = '';
      let monthString: string = '';

      if (dayNumber < 10) {
        dayString = '0' + dayNumber.toString();
      }

      if (monthNumber < 10) {
        monthString = '0' + monthNumber.toString();
      }

      if (dayString != '' && monthString != '') {

        dayAndMonth = dayString + "/" + monthString;

      } else if (dayString != '') {

        dayAndMonth = dayString + "/" + monthNumber.toString();

      } else {

        dayAndMonth = "0" + dayNumber.toString() + "/" + monthString;
      }

    } else {

      dayAndMonth = dayNumber.toString() + "/" + monthNumber.toString();
    }


    this.timerSubscription = this.ScheduleService.getSchedules()
      .subscribe(data => {

        const employeeSchedulesService: any = data;

        const token: Token = jwt_decode(localStorage.getItem('token')!);

        this.employeeName = token.name;


        for (let schedule of employeeSchedulesService) {

          for (let dates of schedule.dates) {

            if (dates === dayAndMonth && schedule.employeeName == this.employeeName) {

              this.employeeSchedule = schedule;

            }

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


